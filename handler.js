const add = triggerGui.getElementsByClassName("add")[0];
add.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 500));
  createNewConfig();
});

getTriggerConfiguration(async () => {
  const triggerConfig = triggerGui.getElementsByClassName("triggerConfig");
  let configData = [];
  let text = "";
  for (let config of triggerConfig) {
    let genC = await config.component.getTriggerConfiguration();
    text += " or " + genC.text;
    configData.push(genC);
  }

  text = "( " + text.substring(4) + " )";

  return {
    text: text,
    data: configData,
  };
});

const createNewConfig = () => {
  let e = document.createElement("trigger-config");
  e.classList.add("triggerConfig");
  triggerGui.appendChild(e);
};

(async () => {
  if (triggerPresetData) {
    for (let config of triggerPresetData) {
      createNewConfig();
      const triggerConfig = triggerGui.getElementsByClassName("triggerConfig");
      let elem = triggerConfig[triggerConfig.length - 1];
      await uiBuilder.ready(elem);
      await elem.component.prepare();
      triggerConfig[triggerConfig.length - 1].component.loadConfig(config);
    }
  }
})();
