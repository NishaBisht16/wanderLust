import React, { useEffect, useState } from 'react'
import { Get } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rupee from '../images/rupee.svg'
import './Home.css'
import fire from '../images/fire.png'
import sleeping from '../images/sleeping.png'
import house from '../images/house.png'
import maountain from '../images/snowed-mountains.png'
import pool from '../images/swimming-man.png'
import castel from '../images/castle.png'
import tent from '../images/tent.png'
import farming from '../images/livestock.png'
import snow from '../images/ice-crystal.png'
import dome from '../images/domes.png'
import boat from '../images/boat.png'
import { useAuth } from '../store/Auth';
function HomeScreen() {
  const [listData, setlistData] = useState([])
  const [isChecked, setIsChecked] = useState(false);

  const {searchquery}=useAuth()
  console.log("searchquery",searchquery)

  const checkToggel = () => {
    if (isChecked) {
      setIsChecked(false)
    }
    else {
      setIsChecked(true)
    }
  }
  const navigate = useNavigate();
  const getAllData = async () => {
    try {
      const data = await Get('allListing')
      console.log(data)
      if (data.result > 0) {
        setlistData(data.result_value)
      }
      else {
        setlistData([])
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllData()
  }, [])

  console.log(isChecked)
  return (
    <div className='main'>
      <div style={{ marginLeft: "20px" }}>
        <Header />
        {/* <h1>All listings</h1> */}
        <div id='filters'>
          <div className='filter'>
            <img src={fire} alt='trending' />
            <p>Trendings</p>

          </div>
          <div className='filter'>
            <img src={sleeping} alt='rooms' />
            <p>Rooms</p>
          </div>
          <div className='filter'>
            <img src={house} alt='rooms' />
            <p>Iconinc cities</p>
          </div>
          <div className='filter'>
            <img src={maountain} alt='rooms' />
            <p>Mountains</p>
          </div>

          <div className='filter'>
            <img src={pool} alt='rooms' />
            <p>Amazing Pool</p>
          </div>
          <div className='filter'>
            <img src={castel} alt='rooms' />
            <p>Castels</p>
          </div>
          <div className='filter'>
            <img src={tent} alt='rooms' />
            <p>camping</p>
          </div>
          <div className='filter'>
            <img src={farming} alt='rooms' />
            <p>Farms</p>
          </div>
          <div className='filter'>
            <img src={snow} alt='rooms' />
            <p>Arctic</p>
          </div>

          <div className='filter'>
            <img src={dome} alt='rooms' />
            <p>Domes</p>
          </div>
          <div className='filter'>
            <img src={boat} alt='rooms' />
            <p>Boat</p>
          </div>


          <div className='tax-toggle'>
            <div className="form-check-reverse form-switch">
              <input className="form-check-input toggel" type="checkbox" role="switch" id="switchCheckDefault" onClick={checkToggel} />
              <label className="form-check-label mr-3" for="switchCheckDefault">Display total after taxes</label>
            </div>
          </div>


        </div>
        <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3'>
          {

            listData && listData.filter(
              (item) =>
                !searchquery ||
                
                item.title?.toLowerCase().includes(searchquery.toLowerCase())
            )
            .map((data) => (
              <div key={data._id}>
                <a href={`/show/${data._id}`} className='listing-link'>
                  <div className="card col listing-card " style={{ width: '30rem' }}>
                    <div className='card-img-overlay'></div>
                    <div className="card-body">
                      <img style={{ height: '20rem' }} src={data.image.url} className="card-img-top" alt="Listing" />
                      <h5 className="card-title">{data.title} </h5>
                      <p>{(data.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}/night
                        {
                          isChecked ? (
                            <i>&nbsp; +&nbsp; 18%GST</i>

                          ):""
                        }


                      </p>

                    </div>
                  </div>
                </a>
              </div>


            ))
          } </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomeScreen;
