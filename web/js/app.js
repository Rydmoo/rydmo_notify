const colors = {
  "~r~": "#FF5733",
  "~g~": "#36A832",
  "~b~": "#3270A8"
};

const notification = (event) => {
  for (let color in colors) {
    if (event.data.message.includes(color)) {
      let colorArray = {};
      colorArray[color] = `<span style="color: ${colors[color]}">`;
      colorArray["~s~"] = `</span>`;

      event.data.message = replaceStr(event.data.message, colorArray);
    }
  }

  let id = $(".notification").length + 1;

  let notificationTpl = $(`
    <div class="notification ${
      event.data.type ? event.data.type : "info"
    }" id=${id}>
      <div class="container">
        <small class="title">Notifikation</small>
        <p>${
          event.data.message !== undefined
            ? event.data.message
            : "Simple notifikation"
        }</p>
      </div>
    </div>
  `);

  notificationTpl.appendTo("#root");

  setTimeout(() => {
    notificationTpl.addClass("load");

    setTimeout(() => {
      notificationTpl.addClass("clear");

      notificationTpl.one("animationend", function() {
        notificationTpl.remove();
      });
    }, event.data.timeout || 7500); 
  }, 100); 
};

const replaceStr = (stringT, obj) => {
  let returnString = stringT;

  for (let id in obj) {
    returnString = returnString.replace(new RegExp(id, "g"), obj[id]);
  }

  return returnString;
};

window.addEventListener("message", notification);
