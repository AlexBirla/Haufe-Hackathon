import { useEffect,useState, } from 'react';
import React from 'react';
// import Map from './components/Map';
import './App.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
const axios=require ('axios')



// TODO: start here

async function getData(){
  const data = await axios.get('http://localhost:5000').then(response => {
  return response.data
  })
  return data;
}  


function App() {
  const [data,setData]=useState([])
 
  useEffect(() => {
    getData().then(res => {
      setData(res)
    });
  },[])
  const position = [45.75372, 21.22571]
  let nrHaine=0,nrSticla=0,nrDeseuriVoluminoase=0,nrBaterii=0,nrUlei=0
  for(let i=0; i<data.length;i++){
      if(data[i]['tip colectare'] === 'sticlă')
        nrSticla++
      if(data[i]['tip colectare'] === 'haine')
        nrHaine++
      if(data[i]['tip colectare'] === 'deșeuri voluminoase')
        nrDeseuriVoluminoase++
      if(data[i]['tip colectare'] === 'baterii')
        nrBaterii++   
      if(data[i]['tip colectare'] === 'ulei utilizat')
        nrUlei++         
  }
  console.log(nrUlei)
  return (
    <>
  <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Tip colectare</th>
      <th>Adresa</th>
      <th>Companie</th>
      <th>Website</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => {
      return (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{ item['tip colectare'] }</td>
          <td>{ item.adresa }</td>
          <td>{ item.companie }</td>
          <td>{ item.website }</td>
        </tr>
      );
    })}
  </tbody>
</table>
<>
<h1>Numar centre colectare sticlă:{nrSticla}</h1>
<h1>Numar centre colectare haine:{nrHaine}</h1>
<h1>Numar centre colectare deșeuri voluminoase:{nrDeseuriVoluminoase}</h1>
<h1>Numar centre colectare baterii:{nrBaterii}</h1>
<h1>Numar centre colectare ulei utilizat:{nrUlei}</h1>
</>
<div>
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {data.map( item => {
      let coords=[item.latitudine, item.longitudine]
      return(
      <Marker position={coords} key={item._id+'###'}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
      )
    })}
  </MapContainer>
  </div>
      {/* <Map/> */}
    </>
  );
}

export default App;
