const data = [
  {
    name: "Rabindra",
    Profession: "Student",
    Roll: "137",
  },
  {
    name: "Manish",
    Profession: "Student",
    Roll: "128",
  },
  {
    name: "Rajkumar",
    Profession: "Student",
    Roll: "139",
  },
];

function getData() {
  setTimeout(() => {
    let output = "";
    data.forEach((datas, index) => {
      output += `<li>${datas.name}</li>`;
    });
    console.log(output);
    document.body.innerHTML = output;
  }, 5000);
}
function createData(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.push(newData);
      let error = false;
      if (!error) {
        resolve();
      } else {
        reject("wrong");
      }
      getData;
    }, 2000);
  });
}

// createData({
//   name: "Vivek",
//   Profession: "Engineer",
//   Roll: "120",
// })
//   .then(getData)
//   .catch((err) => console.log(err));

async function start() {
  await createData(
    {
      name: "Vivek",
      Profession: "Engineer",
      Roll: "120",
    },
    getData()
  );
}
start();
