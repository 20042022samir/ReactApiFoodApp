import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null)


    useEffect(() => {
      const fetchMeals = async () => {
        setIsLoading(true)
        try {
          const response = await window.fetch('https://react-http-7e672-default-rtdb.firebaseio.com/Meals.json')
          if (!response.ok) {
            throw new Error("something went wrong!");
          }
          const responseData = await response.json();
          const loadedMelas = [];
          for (const key in responseData) {
            loadedMelas.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price
            });
          }
          setMeals(loadedMelas)
        }
        catch (error) {
          setHttpError(error.message)
        }
        setIsLoading(false)
      }
      fetchMeals()
    }, [])
    



  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (httpError) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>{httpError}</h2>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {
          isLoading
          &&
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
