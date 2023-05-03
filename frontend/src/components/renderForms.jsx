import { React, useState } from 'react';
import { InputLabel, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ////////////////////////////////// 
// HTML
// ////////////////////////////////// 
export const RenderHTMLForm = () => {
  const navigate = useNavigate();
  const [langHTML, setHTMLLang] = useState('');
  const [tempHTML, setHTMLTemp] = useState('');
  const [xmlDataHTML, setHTMLData] = useState('');

  const handleHTMLSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/render/html?language=' + langHTML + '&template=' + tempHTML, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlDataHTML
    });

    if (response.ok) {
      navigate('/render/HTML/result');
      const responseData = await response.text();

      // Save the result to DOWNLOADS folder
      const blob = new Blob([responseData], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "rendered_e-invoice.html");
      link.click();
      URL.revokeObjectURL(url);
    } else if (response.status === 400) {   
      alert('Invalid XML Input. Please try again.');
    } else {
      console.error('Error:', response.statusText);
    }

  }

  return(
    <>
      <form onSubmit={handleHTMLSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FormControl sx={{ marginTop: '2%', width: '20%' }} required>
          <InputLabel sx={{ fontSize: '10pt' }}>Language</InputLabel>
          <Select
            id="render-html-lang"
            label="Language"
            onChange={(e) => setHTMLLang(e.target.value)}
          >
            <MenuItem value={'zh-Hans'}>Chinese</MenuItem>
            <MenuItem value={'de'}>Dutch</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'fr'}>French</MenuItem>
            <MenuItem value={'hi'}>Hindi</MenuItem>
            <MenuItem value={'ru'}>Russian</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%' }} required>
          <InputLabel sx={{ fontSize: '10pt' }}>Template</InputLabel>
          <Select 
            id="render-html-template"
            label="Template"
            onChange={(e) => setHTMLTemp(e.target.value)}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'detailed'}>Detailed</MenuItem>
            <MenuItem value={'vertical'}>Vertical</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField multiline required id="render-html-input" label="XML Input" variant="outlined" onChange={(e) => setHTMLData(e.target.value)} />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt' }}>Render HTML</Button>
      </form>
    </>
  );
}

// ////////////////////////////////// 
// JSON
// ////////////////////////////////// 
export const RenderJSONForm = () => {
  const navigate = useNavigate();
  const [tempJSON, setJSONTemp] = useState('');
  const [xmlDataJSON, setJSONData] = useState('');

  const handleJSONSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/render/json?language=en&template=' + tempJSON, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlDataJSON
    });

    if (response.ok) {
      const responseData = await response.text();
      navigate('/render/JSON/result')

      // Save the result to DOWNLOADS folder
      const json = responseData;
      const file = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rendered_e-invoice.json';
      link.click();
      URL.revokeObjectURL(url);
    } else if (response.status === 400) {   
      alert('Invalid XML Input. Please try again.');
    } else {
      console.error('Error:', response.statusText);
    }

  }

  return(
    <>
      <form onSubmit={handleJSONSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FormControl sx={{ marginTop: '2%', width: '20%' }} required>
          <InputLabel sx={{ fontSize: '10pt' }}>Template</InputLabel>
          <Select 
            id="render-JSON-template"
            label="Template"
            onChange={(e) => setJSONTemp(e.target.value)}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'detailed'}>Detailed</MenuItem>
            <MenuItem value={'vertical'}>Vertical</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField multiline required id="render-JSON-input" label="XML Input" variant="outlined" onChange={(e) => setJSONData(e.target.value)} />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt' }}>Render JSON</Button>
      </form>
    </>
  );
}

// ////////////////////////////////// 
// PDF
// ////////////////////////////////// 
export const RenderPDFForm = () => {
  const navigate = useNavigate();
  const [langPDF, setPDFLang] = useState('');
  const [tempPDF, setPDFTemp] = useState('');
  const [xmlDataPDF, setPDFData] = useState('');

  const handlePDFSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/render/pdf?language=' + langPDF + '&template=' + tempPDF, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlDataPDF
    });

    if (response.ok) {
      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rendered_e-invoice.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      navigate('/render/PDF/result');
    } else if (response.status === 400) {   
      alert('Invalid XML Input. Please try again.');
    } else {
      console.error('Error:', response.statusText);
    }
  }

  return(
    <>
      <form onSubmit={handlePDFSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FormControl sx={{ marginTop: '2%', width: '20%' }} required>
          <InputLabel sx={{ fontSize: '10pt' }}>Language</InputLabel>
          <Select
            id="render-PDF-lang"
            label="Language"
            onChange={(e) => setPDFLang(e.target.value)}
          >
            <MenuItem value={'de'}>Dutch</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'fr'}>French</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%' }} required>
          <InputLabel sx={{ fontSize: '10pt' }}>Template</InputLabel>
          <Select 
            id="render-PDF-template"
            label="Template"
            onChange={(e) => setPDFTemp(e.target.value)}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'detailed'}>Detailed</MenuItem>
            <MenuItem value={'vertical'}>Vertical</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField multiline required id="render-PDF-input" label="XML Input" variant="outlined" onChange={(e) => setPDFData(e.target.value)} />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt' }}>Render PDF</Button>
      </form>
    </>
  );
}