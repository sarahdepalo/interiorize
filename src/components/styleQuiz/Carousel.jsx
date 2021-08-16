import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//To do:
//Post the locally stored variables to the API
//Make it look like the mock-up
//Mobile Responsiveness
// For the style slide, add an onClick feature that takes them back to the top of the page
//Add icons for each selection!
//Display a message after submit saying thanks for your responses. Our team of experts will start putting together your first order as soon as possible.
//Add a button after message to redirect to user profile
//Add a message underneath Style Quiz briefly explaining why you have to take the quiz(helps our stylists determine the best items to send you)

const CarouselContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [style, setStyle] = useState("");
  const [budget, setBudget] = useState("");
  const [room, setRoom] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [avoidArray, setAvoidArray] = useState([]);
  const [checkCount, setCheckCount] = useState(0);

  //Carousel Controls:
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  //   CHANGES
  const handleStyleChange = (event) => {
    setStyle(parseInt(event.target.value));
  };

  const handleBudgetChange = (event) => {
    console.log(event.target.value);
    let budgetValue = parseInt(event.target.value);
    setBudget(budgetValue);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleColor1Change = (event) => {
    setColor1(parseInt(event.target.value));
  };

  const handleColor2Change = (event) => {
    setColor2(parseInt(event.target.value));
  };

  const handleColor3Change = (event) => {
    setColor3(parseInt(event.target.value));
  };

  const handleAvoidChange = (event) => {
    let index;
    console.log("AVOID ARRAY:", avoidArray);
    if (event.target.checked) {
      let newValue = event.target.value;
      avoidArray.push(newValue);
      setCheckCount(checkCount + 1);
    } else {
      index = avoidArray.indexOf(event.target.value);
      avoidArray.splice(index, 1);
      setCheckCount(checkCount - 1);
    }
  };

  // SUBMITS
  const handleBudgetSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Budget", budget);
  };

  const handleStyleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Style Category", style);
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Room Choice", room);
  };

  const handleColor1Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 1", color1);
  };

  const handleColor2Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 2", color2);
  };

  const handleColor3Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 3", color3);
  };

  const handleAvoidSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Avoid", avoidArray);
    submitQuizData();
    if (localStorage.getItem("Avoid").length > 0) {
      submitAvoidData();
    }
  };

  const submitQuizData = async () => {
    const localUrl = 'http://localhost:3333/quizzes/add';
    const url = `https://api.interiorize.design/quizzes/add`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 2,
        budget: localStorage.getItem("Budget"),
        color_one_id: localStorage.getItem("Color 1"),
        color_two_id: localStorage.getItem("Color 2"),
        color_three_id: localStorage.getItem("Color 3"),
        category_id: localStorage.getItem("Room Choice"),
        style_id: localStorage.getItem("Style Category"),
      }),
    };
    const response = await fetch(url, requestOptions).then((response) =>
      console.log(response)
    );
  };

  const submitAvoidData = async () => {
    const localUrl = 'http://localhost:3333/users/avoid/add';
    const url = 'https://api.interiorize.design/users/avoid/add';
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 2,
        avoid_tags: localStorage.getItem('Avoid')
      }),
    };
    const response = await fetch(url, requestOptions).then(response => console.log(response));
  };

  return (
    <Carousel
      autoplay={false}
      showArrows={false}
      showThumbs={false}
      showIndicators={false}
      interval={2200000}
      showStatus={false}
      emulateTouch={false}
      swipeable={false}
      selectedItem={currentSlide}
      onChange={updateCurrentSlide}
    >
      {/* BUDGET */}
      <div className="carouselSlide">
        <h2>What's your budget?</h2>
        <form onSubmit={(event) => handleBudgetSubmit(event)}>
          <div className="row">
            <div className="col">
              <input
                id="40"
                type="radio"
                name="budget"
                value="40"
                onChange={(event) => handleBudgetChange(event)}
                required
              />
              <label for="40">$40</label>
            </div>
            <div className="col">
              <input
                id="80"
                type="radio"
                name="budget"
                value="80"
                onChange={(event) => handleBudgetChange(event)}
              />
              <label for="80">$80</label>
            </div>
            <div className="col">
              <input
                id="120"
                type="radio"
                name="budget"
                value="120"
                onChange={(event) => handleBudgetChange(event)}
              />
              <label for="120">$120</label>
            </div>
          </div>
          <button
            type="submit"
            className="secondaryBtn"
            onClick={budget !== "" ? () => next() : null}
          >
            Next
          </button>
        </form>
      </div>

      {/* STYLE */}

      <div className="carouselSlide">
        <h2>Which picture best describes your style?</h2>
        <form onSubmit={(event) => handleStyleSubmit(event)}>
          <div className="row">
            <div className="styleCol">
              <input
                id="bohemian"
                type="radio"
                name="style"
                value="18"
                onChange={(event) => handleStyleChange(event)}
                required
              />

              <label className="styleImg bohemian" for="bohemian"></label>

              <p>Bohemian</p>
            </div>
            <div>
              <div className="styleCol">
                <input
                  id="farmhouse"
                  type="radio"
                  name="style"
                  value="16"
                  onChange={(event) => handleStyleChange(event)}
                />

                <label className="styleImg farmhouse" for="farmhouse"></label>

                <p>Farmhouse</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <div className="styleCol">
                <input
                  id="contemporary"
                  type="radio"
                  name="style"
                  value="17"
                  onChange={(event) => handleStyleChange(event)}
                />

                <label
                  className="styleImg contemporary"
                  for="contemporary"
                ></label>

                <p>Contemporary</p>
              </div>
            </div>
            <div>
              <div className="styleCol">
                <input
                  id="modern"
                  type="radio"
                  name="style"
                  value="15"
                  onChange={(event) => handleStyleChange(event)}
                />

                <label className="styleImg modern" for="modern"></label>

                <p>Modern</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={style !== "" ? () => next() : null}
            className="secondaryBtn"
          >
            Next
          </button>
        </form>
      </div>

      {/* ROOM SELECTION */}

      <div
        className="carouselSlide"
        onChange={(event) => handleRoomChange(event)}
      >
        <h3>Which room would you like to focus on first?</h3>
        <form onSubmit={(event) => handleRoomSubmit(event)}>
          <div className="roomCol">
            <input
              id="livingRoom"
              type="radio"
              name="room"
              value="1"
              required
            />
            <label for="livingRoom" className="livingRoom"></label>
            <p>Living Room</p>
          </div>
          <div className="roomCol">
            <input id="bedroom" type="radio" name="room" value="2" />
            <label for="bedroom" className="bedroom"></label>
            <p>Bedroom</p>
          </div>
          <div className="roomCol">
            <input id="bathroom" type="radio" name="room" value="3" />
            <label for="bathroom"></label>
            <p>Bathroom</p>
          </div>
          <input id="kitchen" type="radio" name="room" value="4" />
          <label for="kitchen">Kitchen</label>

          <input id="patio" type="radio" name="room" value="5" />
          <label for="patio">Patio</label>

          <button
            className="secondaryBtn"
            type="submit"
            onClick={room !== "" ? () => next() : null}
          >
            Next
          </button>
        </form>
      </div>

      <div className="carouselSlide">
        {/* COLOR SELECTION */}
        <div className="colorContainer">
          <h3>Choose Your First Color</h3>
          <div>
            <form onSubmit={(event) => handleColor1Submit(event)}>
              <input
                id="red"
                type="radio"
                name="color"
                value="1"
                onChange={(event) => handleColor1Change(event)}
                required
              />
              <label for="red">Red</label>

              <input
                id="blue"
                type="radio"
                name="color"
                value="2"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="blue">Blue</label>

              <input
                id="black"
                type="radio"
                name="color"
                value="3"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="black">Black</label>

              <input
                id="white"
                type="radio"
                name="color"
                value="4"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="white">White</label>

              <input
                id="yellow"
                type="radio"
                name="color"
                value="5"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="yellow">Yellow</label>

              <input
                id="green"
                type="radio"
                name="color"
                value="6"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="green">Green</label>

              <input
                id="purple"
                type="radio"
                name="color"
                value="7"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="purple">Purple</label>

              <input
                id="orange"
                type="radio"
                name="color"
                value="8"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="orange">Orange</label>

              <input
                id="gray"
                type="radio"
                name="color"
                value="10"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="gray">Gray</label>

              <input
                id="brown"
                type="radio"
                name="color"
                value="11"
                onChange={(event) => handleColor1Change(event)}
              />
              <label for="brown">Brown</label>

              <button
                type="submit"
                className="secondaryBtn"
                onClick={color1 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="carouselSlide">
        {/* COLOR SELECTION 2  */}
        <div className="colorContainer">
          <h3>Choose Your Second Color</h3>
          <div>
            <form onSubmit={(event) => handleColor2Submit(event)}>
              <input
                id="red2"
                type="radio"
                name="color2"
                value="1"
                className={color1 === 1 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
                required
              />
              <label for="red2" className={color1 === 1 ? "hidden" : "active"}>
                Red
              </label>

              <input
                id="blue2"
                type="radio"
                name="color2"
                value="2"
                className={color1 === 2 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label for="blue2" className={color1 === 2 ? "hidden" : "active"}>
                Blue
              </label>

              <input
                id="black2"
                type="radio"
                name="color2"
                value="3"
                className={color1 === 3 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="black2"
                className={color1 === 3 ? "hidden" : "active"}
              >
                Black
              </label>

              <input
                id="white2"
                type="radio"
                name="color2"
                value="4"
                className={color1 === 4 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="white2"
                className={color1 === 4 ? "hidden" : "active"}
              >
                White
              </label>

              <input
                id="yellow2"
                type="radio"
                name="color2"
                value="5"
                className={color1 === 5 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="yellow2"
                className={color1 === 5 ? "hidden" : "active"}
              >
                Yellow
              </label>

              <input
                id="green2"
                type="radio"
                name="color2"
                value="6"
                className={color1 === 6 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="green2"
                className={color1 === 6 ? "hidden" : "active"}
              >
                Green
              </label>

              <input
                id="purple2"
                type="radio"
                name="color2"
                value="7"
                className={color1 === 7 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="purple2"
                className={color1 === 7 ? "hidden" : "active"}
              >
                Purple
              </label>

              <input
                id="orange2"
                type="radio"
                name="color2"
                value="8"
                className={color1 === 8 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="orange2"
                className={color1 === 8 ? "hidden" : "active"}
              >
                Orange
              </label>

              <input
                id="gray2"
                type="radio"
                name="color2"
                value="10"
                className={color1 === 10 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="gray2"
                className={color1 === 10 ? "hidden" : "active"}
              >
                Gray
              </label>

              <input
                id="brown2"
                type="radio"
                name="color2"
                value="11"
                className={color1 === 11 ? "hidden" : "active"}
                onChange={(event) => handleColor2Change(event)}
              />
              <label
                for="brown2"
                className={color1 === 11 ? "hidden" : "active"}
              >
                Brown
              </label>

              <button
                type="submit"
                className="secondaryBtn"
                onClick={color2 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* COLOR SELECTION 3 */}
      <div className="carouselSlide">
        <div className="colorContainer">
          <h3>Choose Your Third Color</h3>
          <div>
            <form onSubmit={(event) => handleColor3Submit(event)}>
              <input
                id="red3"
                type="radio"
                name="color3"
                value="1"
                className={color1 === 1 || color2 === 1 ? "hidden" : "active"}
                onChange={(event) => handleColor3Change(event)}
                required
              />
              <label
                for="red3"
                className={color1 === 1 || color2 === 1 ? "hidden" : "active"}
              >
                Red
              </label>

              <input
                id="blue3"
                type="radio"
                name="color3"
                value="2"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 2 || color2 === 2 ? "hidden" : "active"}
              />
              <label
                for="blue3"
                className={color1 === 2 || color2 === 2 ? "hidden" : "active"}
              >
                Blue
              </label>

              <input
                id="black3"
                type="radio"
                name="color3"
                value="3"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 3 || color2 === 3 ? "hidden" : "active"}
              />
              <label
                for="black3"
                className={color1 === 3 || color2 === 3 ? "hidden" : "active"}
              >
                Black
              </label>

              <input
                id="white3"
                type="radio"
                name="color3"
                value="4"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 4 || color2 === 4 ? "hidden" : "active"}
              />
              <label
                for="white3"
                className={color1 === 4 || color2 === 4 ? "hidden" : "active"}
              >
                White
              </label>

              <input
                id="yellow3"
                type="radio"
                name="color3"
                value="5"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 5 || color2 === 5 ? "hidden" : "active"}
              />
              <label
                for="yellow3"
                className={color1 === 5 || color2 === 5 ? "hidden" : "active"}
              >
                Yellow
              </label>

              <input
                id="green3"
                type="radio"
                name="color3"
                value="6"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 6 || color2 === 6 ? "hidden" : "active"}
              />
              <label
                for="green3"
                className={color1 === 6 || color2 === 6 ? "hidden" : "active"}
              >
                Green
              </label>

              <input
                id="purple3"
                type="radio"
                name="color3"
                value="7"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 7 || color2 === 7 ? "hidden" : "active"}
              />
              <label
                for="purple3"
                className={color1 === 7 || color2 === 7 ? "hidden" : "active"}
              >
                Purple
              </label>

              <input
                id="orange3"
                type="radio"
                name="color3"
                value="8"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 8 || color2 === 8 ? "hidden" : "active"}
              />
              <label
                for="orange3"
                className={color1 === 8 || color2 === 8 ? "hidden" : "active"}
              >
                Orange
              </label>

              <input
                id="gray3"
                type="radio"
                name="color3"
                value="10"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 10 || color2 === 10 ? "hidden" : "active"}
              />
              <label
                for="gray3"
                className={color1 === 10 || color2 === 10 ? "hidden" : "active"}
              >
                Gray
              </label>

              <input
                id="brown3"
                type="radio"
                name="color3"
                value="11"
                onChange={(event) => handleColor3Change(event)}
                className={color1 === 11 || color2 === 11 ? "hidden" : "active"}
              />
              <label
                for="brown3"
                className={color1 === 11 || color2 === 11 ? "hidden" : "active"}
              >
                Brown
              </label>

              <button
                className="secondaryBtn"
                type="submit"
                onClick={color3 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* AVOID */}
      <div className="carouselSlide">
        <h3>Which items should we NOT send you?</h3>
        <form onSubmit={(event) => handleAvoidSubmit(event)}>
          <input
            type="checkbox"
            id="anything"
            name="avoid"
            value={null}
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="anything">Send me anything!</label>
          <input
            type="checkbox"
            id="pillows"
            name="avoid"
            value="7"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="pillows">Pillows</label>
          <input
            type="checkbox"
            id="lamps"
            name="avoid"
            value="3"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="lamps">Lamps</label>
          <input
            type="checkbox"
            id="art"
            name="avoid"
            value="4"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="art">Art</label>
          <input
            type="checkbox"
            id="decor"
            name="avoid"
            value="5"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="decor">Decor</label>
          <input
            type="checkbox"
            id="kitchenLinens"
            name="avoid"
            value="9"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="kitchenLinens">Kitchen Linens</label>
          <input
            type="checkbox"
            id="storage"
            name="avoid"
            value="11"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="storage">Storage</label>
          <input
            type="checkbox"
            id="serverware"
            name="avoid"
            value="13"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="serverware">Serverware</label>
          <input
            type="checkbox"
            id="utensils"
            name="avoid"
            value="14"
            onChange={(event) => handleAvoidChange(event)}
          />
          <label for="utensils">Utensils</label>
          {checkCount === 0 ? (
            <p>Please Choose at Least One Option</p>
          ) : (
            <button type="submit" className="secondaryBtn">
              Submit
            </button>
          )}
        </form>
      </div>
    </Carousel>
  );
};

export default CarouselContainer;
