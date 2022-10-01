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
  const position = [51.505, -0.09]
  console.log(data)
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
