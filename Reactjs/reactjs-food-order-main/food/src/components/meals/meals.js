import { Fragment } from 'react';
import MealsSummary from './mealsSummary'
import AvailableMeals from './availablemeals';

const Meals=()=>{
    return <Fragment>
        <MealsSummary/>
        <AvailableMeals/>
    </Fragment>


}
export default Meals;