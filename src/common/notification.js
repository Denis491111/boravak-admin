export default {
  install: function(Vue) {
    addAlertsContainerToBody();
    Vue.prototype.$notification = function (params) {
      showAlert(params);
    };
  }
};

export function addAlertsContainerToBody() {
  const body = document.querySelector("body");
  body.insertAdjacentHTML(
      "beforeend",
      "<div class='zoran-alerts-container'></div>"
  );
}

export function showAlert(params) {
  if (!params.type) {
    params.type = "base";
  }
  const availableTypes = ["base", "success", "error"];
  if (params && params.text && availableTypes.includes(params.type)) {
    const alertsContainer = document.querySelector(".zoran-alerts-container");
    const elementClass =
        "zoran-alerts-container__item zoran-alerts-container__item_" + params.type;
    const elementId = new Date().getTime() + Math.floor((Math.random() + 1) * 999999);
    const element = '<div class="'+elementClass+'" data-id="'+elementId+'">' +
        (params.title ? '<span class="zoran-alerts-container__item-title">'+params.title+'</span>' : '') +
        '<span class="zoran-alerts-container__item-text">'+params.text+'</span>' +
        '<button class="zoran-alerts-container__item-remover"></button></div>';
    alertsContainer.insertAdjacentHTML("beforeend", element);
    const readyAlertItem = document.querySelector(
        "[data-id='" + elementId + "']"
    );

    const readyAlertItemRemover = readyAlertItem.querySelector(
        ".zoran-alerts-container__item-remover"
    );

    let _timer = null;
    let _closed = false;

    const closeAlertItem = function() {
      _closed = true;
      readyAlertItem.setAttribute("closed", "");
      setTimeout(function() {
        alertsContainer.removeChild(readyAlertItem);
      }, 80);
    };

    readyAlertItemRemover.onclick = function() {
      _timer && clearTimeout(_timer);
      if (_closed) return;
      closeAlertItem();
    };

    if (!params.is_shown_always) {
      _timer = setTimeout(function() {
        closeAlertItem();
      }, params.timeout || 3000);
    }
  }
}
