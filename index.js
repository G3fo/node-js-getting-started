const express = require("express");
const PORT = process.env.PORT || 5000;
const Bearer = require("@bearer/node")("FUFbE-aEBIbyWN5aVuX3wpWVp5pMOL8C");
const gsheet = Bearer.integration("google_sheets");
const auth = "f9f11600-7b78-11ea-acf0-6992bb43099f";
const spreadsheetId = "1Fh6NwzEtnGFtkRPcssIcKvLjNG-CyFVNJyrsBopyA4Q";

const mensaje = "";
const app = express();

app.listen(PORT, () => {
  console.log(`escuchando en puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("noes");
});

app.get("/api/balance", (req, res) => {
  gsheet
    .auth(auth)
    .get(`14jey1jfv9gUeMFbbRpuNGtpRG9ntAqnSsLULVdmsvcc/values/A1`)
    .then((r) => {
      let balance = r.data.values;
      res.json({ balance: balance[0][0] });
      res.send(res);
    })
    .catch(() => {
      console.log("whoops");
    });
});

// app.listen(port, () => {
//   console.log(`escuchando en puerto ${port}`);
// });

app.post(`/api/add`, (req, res) => {
  console.log(req.body);
  res.send("epa");
});

const formattedDate = () => {
  let d = new Date();
  let date;
  d.setMonth(d.getMonth() + 1);
  date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  return date;
};

const postAPI = () => {
  let data = [[formattedDate(), "900", "Deniro", "Comida"]];

  gsheet
    .auth(auth)
    .post(`${spreadsheetId}/values/B22:append`, {
      body: { values: data },
      query: { valueInputOption: "RAW" },
    })
    .then(() => {
      mensaje = "POST SUCCESS";
      console.log(mensaje);
      alert(mensaje);
    })
    .catch(() => {
      console.log("whoops");
    });
};

// console.log(postAPI());

// const getAPI = () => {
//   let balance;
//   gsheet
//     .auth(auth)
//     .get(`14jey1jfv9gUeMFbbRpuNGtpRG9ntAqnSsLULVdmsvcc/values/A1`, {
//       // body: { values: data },
//       // query: { valueInputOption: "RAW" }
//     })
//     .then((res) => {
//       console.log(res.data);
//       balance = res.data;
//       return balance;
//     })
//     .catch(() => {
//       console.log("whoops");
//     });
// };
