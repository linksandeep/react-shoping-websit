import React from "react";


const ManuCard = ({ menuData }) => {
  return (
   <>
   <section className="main-card--cointainer">
   {menuData.map((curElem) => {
    return (
      <>
      

{/* // <nav>
// <div className="menuIcom">
//     <ul className="navbar-list">
//         <li>
//             <NavLink to="/Login">Login</NavLink>
//         </li>
//         <li>
//             <NavLink to="/SignUp">SignUp</NavLink>
//         </li>
//     </ul>

// </div>
// </nav> */}
        <div className="card-container" key={curElem.id}>
          <div className="card">
            <div className="card-body">
              <span className="card-number card-circle subtle">{curElem.id}</span>
              <span className="card-author subtle">{curElem.name}</span>
              <h2 className="card-title">{curElem.name}</h2>
              <span className="card-discription subtle">this could be a best gift if you want to give something uniq.
              </span>
              <div className="card-read">read</div>

            </div>
            <img src= {curElem.image} alt="images" className="card-media" />
            <span className="cart-tag subtle">Order Now</span>
          </div>
        </div>
      </>

    );
  })}
  </section>
  </>
     );
};


export default ManuCard;