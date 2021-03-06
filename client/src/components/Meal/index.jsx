import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import './style.css'
import Container from '@material-ui/core/Container';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import { Link } from "react-router-dom";

export default function Meal({meal}) {
    const [imageUrl, setImageURl] = useState("");
    const [clicked, setClicked] = useState();
    

    useEffect(()=>{
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=471c7901604e4c7c99fe892a8ad9342b&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((data)=> {
            setImageURl(data.image)
        })
        .catch(()=>{
            console.log("error");
        })
    }, [meal.id])


    function favoritesData(data) {
        const favMeal = { title: meal.title, url: meal.sourceUrl, id: meal.id, image: imageUrl}
        axios.put('/api/user/recipes', favMeal) // maybe use api/user/:id instead
            .then(data => {
              console.log('Success:', data);
              setClicked(true)
            })
            .catch((error) => {
              console.error('Error:', error);
            });


    }


    return <article>
        <Container>
        <div className="meal-card">
        <h2>{meal.title}</h2>
        <img src= {imageUrl} alt="recipe" />
            <h1>Preparation time: {meal.readyInMinutes} minutes.</h1>
            <h1>Number of Servings: {meal.servings}</h1>

        <div className='recipe-button'>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
              <FormatListBulletedIcon/>
        <a href={meal.sourceUrl} target="_blank">Go to Recipe</a>
                  </Button>
                  </div>

        <div className='favorite-button'>
        <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={favoritesData}
          >
      {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            Add to Favorites
          </Button>
          </div>
     </div>
     </Container>
    </article>
}