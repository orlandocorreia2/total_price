const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    coberturas: {
      a: "a",
      c: "b",
      iof: 3,
      premio: { comercial: 2, total: 2.4, a: "a", d: "d" },
      segundaCoberturas: [
        {
          a: "c",
          c: "d",
          iof: 5,
          premio: { comercial: 8, total: 3.4, a: "a", d: "d" },
          outrasCoberturas: [
            {
              a: "e",
              c: "f",
              iof: 20,
              premio: { comercial: 30, total: 8, a: "a", d: "d" },
            },
          ],
        },
        {
          a: "g",
          c: "h",
          premio: { comercial: 2, total: 6, a: "m", d: "n" },
        },
        {
          a: "i",
          c: "j",
          iof: 90,
          premio: { comercial: 30, total: 11, a: "o", d: "p" },
          outrasCoberturas: [
            {
              a: "k",
              c: "l",
              iof: 50,
              premio: { comercial: 10, total: 15, a: "q", d: "r" },
            },
          ],
        },
      ],
    },
  };

  const ajustaPremioTotal = (item) => {
    if (
      typeof item === "object" &&
      item.iof &&
      item.premio &&
      item.premio.comercial &&
      item.premio.total
    ) {
      item.premio.total = item.iof + item.premio.comercial;
    }
  };

  const percorreObject = (item) => {
    ajustaPremioTotal(item);
    const objectKeys = Object.keys(item);
    objectKeys.forEach((keyItem) => {
      if (typeof item[keyItem] === "object") percorreObject(item[keyItem]);
      if (Array.isArray(item[keyItem])) percorreArray(item[keyItem]);
    });
  };

  const percorreArray = (items) => {
    items.forEach((item) => {
      if (Array.isArray(item)) percorreArray(item);
      if (!!item && typeof item === "object") percorreObject(item);
    });
  };

  percorreArray([data]);

  res.send({ data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
