import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCaretRight } from "react-icons/ai";

function Content() {
    const [search, setSearch] = useState("");
    const [trigger, setTrigger] = useState(true);
    const [fetchedData, setFetchedData] = useState();
  
    const fetch = async () => {
      const fetchedTask = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (fetchedTask) {
        setFetchedData(fetchedTask.data.meals);
      }
    };
  
    useEffect(() => {
      fetch();
    }, [trigger]);
  
    const searchFood = async () => {
      try {
        const fetchedTask = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        if (fetchedTask) {
          setFetchedData(fetchedTask.data.meals);
          setTrigger(!trigger);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        search === "" ? alert("please enter receipe to search") : searchFood();
      };
    
      const handleInputChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
          setTrigger(!trigger);
        }
      };
  return (
    <div>
      <nav className='_navbar d-flex justify-content-center'>
        <form
          className='d-flex gap-3'
          onSubmit={handleSearch}
        >
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            onChange={(e) => handleInputChange(e)}
            className='search_input rounded px-2'
            placeholder='Search....'
          />
          <button className='button text-white rounded'>Search</button>
        </form>
      </nav>
      <img
        src={search?`https://source.unsplash.com/1600x1000/?${search}`:"https://source.unsplash.com/1600x1000/?meal" }
        className='img_bg'
        alt='...'
      />
      <main className='container-fluid-md container-lg mt-4 main_body'>
        <div className='results d-flex gap-3'>
          {fetchedData ? (
            fetchedData.map((item) => {
              return (
                <div
                  className='card'
                  key={item.idMeal}
                >
                  <div className='card-body'>                    
                    <div className='img_holder'>
                      <img
                        className='card_img rounded'
                        src={item.strMealThumb}
                        alt='Card image'
                        style={{ width: "100%" }}
                      />
                    </div>
                    <h3 className='card-title text-center'>{item.strMeal}</h3>
                    <div className='text-center'>
                      <a
                        href={item.strYoutube}
                        target='_blank'
                        className='btn btn-primary play'
                      >
                        Watch <span className="playbutton"><AiOutlineCaretRight /></span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className='noitem text-white p-2 rounded'>No food found</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Content