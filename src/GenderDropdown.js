import React from 'react';

const GenderDropdown = (props) => {

   return (
      < div >
         <select onChange={event => props.genderSelected(event)}>
            <option value='men' >Men</option>
            <option value='women' >Women</option>
         </select>
         <br />

      </div >
   )

}

export default GenderDropdown;