const colors = {
  "~r~": "#FF5733",   // Röd färg
  "~g~": "#36A832",   // Grön färg
  "~b~": "#FFFF"    // Blå färg
};

const notification = (event) => {
  // Ersätt färger med span-taggar
  for (let color in colors) {
    if (event.data.message.includes(color)) {
      let colorArray = {};
      colorArray[color] = `<span style="color: ${colors[color]}">`;
      colorArray["~s~"] = `</span>`;

      event.data.message = replaceStr(event.data.message, colorArray);
    }
  }

  // Skapa unikt ID för notifikationen
  let id = $(".notification").length + 1;

  // Skapa notifikationsmall
  let notificationTpl = $(`
    <div class="notification ${
      event.data.type ? event.data.type : "info"
    }" id=${id}>
      <div class="container">
        <small class="title">Notifikation</small>
        <p>${
          event.data.message !== undefined
            ? event.data.message
            : "Jag heter ~r~ohlson~s~ och jag luktar"
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

const replaceStr = (stringT, obj) => {
  let returnString = stringT;

  for (let id in obj) {
    returnString = returnString.replace(new RegExp(id, "g"), obj[id]);
  }

  return returnString;
};

// Lyssna på meddelanden från window och anropa notification-funktionen
window.addEventListener("message", notification);
