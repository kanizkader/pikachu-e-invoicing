import React, { useState } from 'react';
import { Button, Typography, FormControl, TextField, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledPage, PageWriting } from '../pages/./pageStyle';
import { Box } from '@mui/system';


// ////////////////////////////////// 
// Upload
// ////////////////////////////////// 
export const CreateFormViaUpload = () => {
  const navigate = useNavigate();

  const generateEinvoice = async (event) => {
    event.preventDefault();

    var fd = new FormData();
    fd.append('file', document.getElementById('myFile').files[0]);
    
    const response = 
      await fetch('http://redeploy-sprint2-env.eba-nkhzmtjp.ap-southeast-2.elasticbeanstalk.com/invoices', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
        },
        body: fd
      });

    if (response.ok) {
      const responseData = await response.text();
      navigate('/create/results');
      
      const responsefile = await fetch('http://redeploy-sprint2-env.eba-nkhzmtjp.ap-southeast-2.elasticbeanstalk.com/invoices/'+responseData)
      const responsefiledata = await responsefile.text();
      
      // Save the result to DOWNLOADS folder
      const file = new Blob([responsefiledata], { type: 'application/xml' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'UBL_e-invoice.xml';
      link.click();
      URL.revokeObjectURL(url);
    } else if (response.status === 400) {   
      alert('Invalid Input. Please try again.');
    } else {
      console.error('Error:', response.statusText);
    }
  }
  
  return(
      <Box sx={ StyledPage }>
        <form onSubmit={generateEinvoice} id="inout_file" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <FormControl sx={{ marginTop: '2%', width: '100%', height: '50%' }}>
            <input type="file" id="myFile"/>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt' }}>Create E-invoice</Button>
        </form>
      </Box>
  );
}

// ////////////////////////////////// 
// Form
// ////////////////////////////////// 
  
export const CreateFormViaForm = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);

  const addField = () => {
    const newFields = [...fields];
    const newId = fields.length;
    newFields.push({ id: newId, value: '' });
    setFields(newFields);
  };

  const handleFieldChange = (id, value) => {
    const newFields = [...fields];
    const fieldIndex = newFields.findIndex((field) => field.id === id);
    newFields[fieldIndex].value = value;
    setFields(newFields);
  };

  const generateEinvoice = async (event) => {
    event.preventDefault();

    const jd = handleFormEvent();
    const fd = new FormData();
    const jsonBlob = new Blob([JSON.stringify(jd)], { type: "application/json" });
    fd.append("file", jsonBlob, "data.json"); 

    const response = 
      await fetch('http://redeploy-sprint2-env.eba-nkhzmtjp.ap-southeast-2.elasticbeanstalk.com/invoices', {
        method: 'POST',
        headers: {
          'Accept': '*/*'
        },
        body: fd
      });

    if (response.ok) {
      const responseData = await response.text();
      navigate('/create/results');
      
      const responsefile = await fetch('http://redeploy-sprint2-env.eba-nkhzmtjp.ap-southeast-2.elasticbeanstalk.com/invoices/'+responseData)
      const responsefiledata = await responsefile.text();
      
      // Save the result to DOWNLOADS folder
      const file = new Blob([responsefiledata], { type: 'application/xml' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'UBL_e-invoice.xml';
      link.click();
      URL.revokeObjectURL(url);
    } else if (response.status === 400) {   
      alert('Invalid Input. Please try again.');
    } else {
      console.error('Error:', response.statusText);
    }
  }

  //format needs to match test.json
  function handleFormEvent() {

    var invoice_items = [];
    var i = 1;
    while (i <= fields.length) {
      var tax = "False" 
      if (document.getElementById("taxable-"+i).checked) {
        tax = "True"
      }
      invoice_items.push(
        {
          "id": i,
          "description": document.getElementById("description-"+i).value,
          "quantity": Number(document.getElementById("quantity-"+i).value),
          "unit_price": Number(document.getElementById("unit_price-"+i).value),
          "tax_amount": Number(document.getElementById("tax_amount-"+i).value),
          "taxable": tax
        },
      );
      i = i + 1;
    }
    var date = document.getElementById("i_date").value.split('-').reverse().join('-')
    var inputfile = 
    {
      "invoice_number": document.getElementById("i_num").value,
      "invoice_date": date[0],
      "seller": {
        "name": document.getElementById("s_name").value,
        "registrationNumber": document.getElementById("s_regNum").value,
        "contactPerson": document.getElementById("s_contPer").value,
        "address": {
          "street": document.getElementById("s_Sreet").value,
          "city": document.getElementById("s_City").value,
          "state": document.getElementById("s_State").value,
          "postalCode": document.getElementById("s_PostalCode").value,
          "countryCode": document.getElementById("s_countryCode").value
        },
        "electronic_address": document.getElementById("s_elecAddr").value,
        "phone_number": document.getElementById("s_Ph").value
      },
      "buyer": {
        "name": document.getElementById("b_name").value,
        "registrationNumber": document.getElementById("b_regNum").value,
        "contactPerson": document.getElementById("b_contPer").value,
        "address": {
          "street": document.getElementById("b_Sreet").value,
          "city": document.getElementById("b_City").value,
          "state": document.getElementById("b_State").value,
          "postalCode": document.getElementById("b_PostalCode").value,
          "countryCode": document.getElementById("b_countryCode").value
        },
        "electronic_address": document.getElementById("b_elecAddr").value,
        "phone_number": document.getElementById("b_Ph").value
      },
        invoice_items
    };

    return inputfile;
  };

  return(
    <>
      <form onSubmit={generateEinvoice} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        <FormControl style={{ paddingTop: '50px' }} sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Invoice Number" name="Invoice Number" id="i_num"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="date" name="Invoice Date" id="i_date"/>
        </FormControl>

        
        <Typography align="center" style={{ paddingTop: '50px' }} sx={ PageWriting }>Seller Infromation</Typography>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Seller Name" name="Seller Name" id="s_name"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Seller Registration Number" name="Seller Registration Number" id="s_regNum"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Contact Person" name="Contact Person" id="s_contPer"/>
        </FormControl>
    
        <Typography align="center" style={{ paddingTop: '50px' }} sx={ PageWriting }>Seller Address</Typography>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Street" name="Street" id="s_Sreet"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="City" name="City" id="s_City"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="State" name="State" id="s_State"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Post Code" name="Post Code" id="s_PostalCode"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Country Code" name="Country Code" id="s_countryCode"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Electronic Address" name="Electronic Address" id="s_elecAddr"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Phone Number" name="Phone Number" id="s_Ph"/>
        </FormControl>

        <Typography align="center" style={{ paddingTop: '50px' }} sx={ PageWriting }>Buyer Infromation</Typography>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Buyer Name" name="Buyer Name" id="b_name"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Buyer Registration Number" name="Buyer Registration Number" id="b_regNum"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Contact Person" name="Contact Person" id="b_contPer"/>
        </FormControl>
    
        <Typography align="center" style={{ paddingTop: '50px' }} sx={ PageWriting }>Buyer Address</Typography>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Street" name="Street" id="b_Sreet"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="City" name="City" id="b_City"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="State" name="State" id="b_State"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Post Code" name="Post Code" id="b_PostalCode"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Country Code" name="Country Code" id="b_countryCode"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Electronic Address" name="Electronic Address" id="b_elecAddr"/>
        </FormControl>

        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField type="text" label="Phone Number" name="Phone Number" id="b_Ph"/>
        </FormControl>

        <Typography align="center" style={{ paddingTop: '50px' }} sx={ PageWriting }>Items</Typography>
        <div>
          {fields.map((field) => (
            <div key={field.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >

              <Typography align="center" sx={ PageWriting }>Item {field.id + 1}</Typography>

              <FormControl sx={{ marginTop: '5%', width: '150%', height: '50%' }}>
                <TextField type="text" label="Item Description" name="Item Description" id={`description-${field.id + 1}`}/>
              </FormControl>

              <FormControl sx={{ marginTop: '5%', width: '150%', height: '50%' }}>
                <TextField type="number" label="Item Quantity" name="Item Quantity" id={`quantity-${field.id + 1}`}/>
              </FormControl>

              <FormControl sx={{ marginTop: '5%', width: '150%', height: '50%' }}>
                <TextField type="number" label="Unit Price" name="Unit Price" id={`unit_price-${field.id + 1}`}/>
              </FormControl>

              <FormControl sx={{ marginTop: '5%', width: '150%', height: '50%' }}>
                <TextField type="text" label="Tax Amount" name="Tax Amount" id={`tax_amount-${field.id + 1}`}/>
              </FormControl>

              <FormControl sx={{ marginTop: '5%', width: '150%', height: '50%' }}>
                <label align="center" >Taxable</label>
                <Checkbox label="Taxable" name="Taxable" id={`taxable-${field.id + 1}`}/>
              </FormControl>
            </div>
          ))}
          <Button onClick={addField} variant="contained" sx={{ marginTop: '25%', width: '100%', fontSize: '11pt' }}>Add Item</Button>
        </div>
        
        <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt' }}>Create E-invoice</Button>
      </form>
    </>
  );
}