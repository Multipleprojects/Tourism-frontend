import React from 'react'
import StatisticsList from '../Admin_Tour/StatisticsList';
import OffersList from '../Admin_Tour/OffersList';
import Subtitle from '../../../shared/Subtitle';
import Touroperator from '../Admin_Tour/TourOperator';
import CompanyDetails from '../Admin_Tour/CompanyDetails';
import UserDetails from '../Admin_Tour/UserDetails';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Update_Gallery from '../Admin_Tour/Update_Gallery';
import Get_Tour from '../Admin_Tour/Get_Tour';
import BookingDetails from '../BookingDetails';
import MediaDetails from '../Admin_Tour/MediaDetails';
const Admin_Dashboard = () => {
 const navigate=useNavigate();
      return (
    <div className='container'>     
<div>
      <Subtitle subtitle={"Tours"} />
    
<Button onClick={()=>navigate('/admin/dashboard/create/tour')}> Create Tour</Button>
<Get_Tour />
</div>
<div>
      <Subtitle subtitle={"Booking Details"} />
    
<h1>Booking Details</h1>
<BookingDetails />
</div>
     <div>

      <Subtitle subtitle={"Company "} />
<h2>Companies Detail</h2>
<CompanyDetails />
</div>
<div>
      <Subtitle subtitle={"User's "} />
<h2>User's Detail</h2>
<UserDetails />
</div>
      <div>
      <Subtitle subtitle={"Your journey, your story!"} />   
<h2>Tour Operator List</h2>
<Touroperator />
</div>            
      <div>
      <Subtitle subtitle={"What we serve"} />            
<h2>Offers List</h2>
<OffersList />
</div>
      <div>
      <Subtitle subtitle={"Experience"} />
<h2>Statistics List</h2>
<StatisticsList />
</div>

<div>
      <Subtitle subtitle={"Gallery"} />
<h2>Gallery</h2>
<Update_Gallery />
</div>
<div>
      <Subtitle subtitle={"Media"} />
<h2>Media</h2>
<MediaDetails />
</div>

    </div>
  )
}

export default Admin_Dashboard
