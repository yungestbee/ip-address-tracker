import { useState, useEffect } from "react"
import './Address.css'
import image from './icon-arrow.svg'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer,Popup, Marker } from 'react-leaflet'


function Address(){
    const [ip, setIp] = useState('')
    const [input, setInput] = useState('')
    const [location, setLocation] = useState('')
    const [timezone, setTimezone] = useState('')
    const [isp, setIsp] = useState('')
    const [posit, setPosition] = useState('')

    const area = [6.5244, 3.3792]

    const getInput = (e) =>{
        e.preventDefault()
        setInput(e.target.value)
        // console.log(e.target.value)
    }
    console.log(input)
    
    async function one(){
        const position = []
        const data = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_j2pOdR5jfIfGhFaA3UtbHbNYNbHr3&ipAddress=${input}`)
        const result = await data.json()
        position.push(result.location.lat)
        position.push(result.location.lng)
        console.log(result)
        console.log(position)
        setIp(result.ip)
        setLocation(result.location.region)
        setTimezone(result.location.timezone)
        setIsp(result.isp)
        setPosition(position)
        // console.log(result.ip)
        }

        useEffect( ()=>{
            one()
        },[])


    return(
        <>
            <div className="container-fluid-sm">
                <div className='ip'>
                    <h3>IP Address Tracker</h3>
                    <form>
                    <input type="text" placeholder="Search for any IP address or domain" onChange={getInput}/>
                    <img src={image} onClick={one} />
                    </form>
                </div>
            </div>
            <div className="container-fluid-sm">
                <div className="container">
                    <div>
                        <p>IP ADDRESS</p>
                        <h3>{ip}</h3>
                    </div>
                    <div>
                        <p>LOCATION</p>
                        <h3>{location}</h3>
                    </div>
                    <div>
                        <p>TIMEZONE</p>
                        <h3>{timezone}</h3>
                    </div>
                    <div>
                        <p>ISP</p>
                        <h3>{isp}</h3>
                    </div>
                </div>
                <MapContainer center={area} zoom={13} scrollWheelZoom={true}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            </div>
        </>
    )
}

export default Address