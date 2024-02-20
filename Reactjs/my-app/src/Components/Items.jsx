import classes from "./Navbar.module.css";
import crm from "./images/CRM1.jpg";
import Manage from "./images/Event1.jpg";
import invoices from "./images/Invoices2.jpg";
import chef from "./images/Chef1.jpg";
import agency from "./images/Alloction1.jpg";
import Recipe from "./images/Recipe1.jpg";
import Menu from "./images/Plan1.jpg";
import Cutchey from "./images/Cutley.jpg";
import GuestFeed from "./images/Guest1.jpg";
import Groundmnage from "./images/Ground1.jpg";
import EventWise from "./images/eventwise.jpg";
import Accounting from "./images/Acc1.jpg";
import Sales from "./images/Sals.jpg";
import Purchase from "./images/Purchase.jpg";
import Invert from "./images/inventary.jpg";
import Hr from "./images/Hr.jpg";
import Subscription from "./images/Subs.jpg";
import Website from "./images/website.jpg";
import Social from "./images/social.jpg";
import Email from "./images/Email.jpg";
import Hepdesk from "./images/help.jpg";
import Dash from "./images/dash.jpg";
const Item = () => {
  return (
    <div className={classes.back}>
      <div className={classes.Itemscontainer}>
        <div className={classes.item}>
          {" "}
          <center>
            <img
              className={classes.itemImage}
              src={crm}
              height={45}
              width={45}
            ></img>
          </center>{" "}
          <br></br>
          <center>CRM</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={invoices}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Invoices</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Manage}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center> Manage Events</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Menu}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Menu Planning</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={agency}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Agency Allocation</center>
        </div>
        <div className={classes.item}>
          <img
            className={classes.itemImage}
            src={chef}
            height={45}
            width={45}
          ></img>
          <br></br>
          <center>Chef Allocation</center>
        </div>
      </div>
      <div className={classes.Itemscontainer1}>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Recipe}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Recipe Manage</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Cutchey}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Crockery Cutchey</center>
        </div>
        <div className={classes.item}>
          {" "}
          <center>
            <img
              className={classes.itemImage}
              src={GuestFeed}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Guest Feedback</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Groundmnage}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Ground Manage</center>
        </div>
        <div className={classes.item}>
          {" "}
          <center>
            <img
              className={classes.itemImage}
              src={EventWise}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Eventwise Costing</center>
        </div>
        <div className={classes.item}>
          {" "}
          <center>
            <img
              className={classes.itemImage}
              src={Accounting}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Accounting</center>
        </div>
      </div>
      <div className={classes.Itemscontainer2}>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Sales}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Sales</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Purchase}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Purchase</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Invert}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Inventary</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Hr}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>HR</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Subscription}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Subscriptions</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Website}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Websites</center>
        </div>
      </div>
      <div className={classes.Itemscontainer3}>
        <div className={classes.item}>
          <center>
            <a
              href={
                "https://knowbody.github.io/react-router-docs/api/Link.html"
              }
            >
              <img
                className={classes.itemImage}
                src={Social}
                height={45}
                width={45}
              ></img>
              <br></br>
              <center>Social Marketing</center>
            </a>
          </center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Email}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Email Marketing</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Hepdesk}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Helpdesk</center>
        </div>
        <div className={classes.item}>
          <center>
            <img
              className={classes.itemImage}
              src={Dash}
              height={45}
              width={45}
            ></img>
          </center>
          <br></br>
          <center>Dashboard</center>
        </div>
        <div className={classes.item}>
          <center>
            <img className={classes.itemImage} height={45} width={45}></img>
          </center>
          <br></br>
          <center></center>
        </div>
        <div className={classes.item}>
          <center>
            <img className={classes.itemImage} height={45} width={45}></img>
          </center>
          <br></br>
          <center></center>
        </div>
      </div>

      <h1 className={classes.word}>
        Trusted By Over 500+ Clients use Just Wedding
      </h1>
    </div>
  );
};
export default Item;
