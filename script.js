// Write your JavaScript code here!
let nonLetterString = '`1234567890-=[]\;",./~!@#$%^&*()_+{}|:<>?';
let nonLetterArray = nonLetterString.split("");
window.addEventListener("load", function() {
   let form = document.getElementById("launchForm")
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]")
      let copilotName = document.querySelector("input[name=copilotName]")
      let fuelLevel = document.querySelector("input[name=fuelLevel]")
      let cargoMass = document.querySelector("input[name=cargoMass")
      let faultyItems = document.getElementById("faultyItems")
      let pilotStatus = document.getElementById("pilotStatus")
      let copilotStatus = document.getElementById("copilotStatus")
      let fuelStatus = document.getElementById("fuelStatus")
      let cargoStatus = document.getElementById("cargoStatus")
      let launchStatus = document.getElementById("launchStatus")
      let missionTarget = document.getElementById("missionTarget")
      let displayFaultyItems = true;
      let submitForm = true;
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "" ) {
         alert("All fields are required!")
         displayFaultyItems = false;
         submitForm = false;
         event.preventDefault();
      }
      for (i=0; i<pilotName.value.length; i++) {
         if(nonLetterArray.includes(pilotName.value[i])) {
         alert("Please correct Pilot Name. "+pilotName.value + " is not a valid name")
         displayFaultyItems = false;
         submitForm = false;
         event.preventDefault();
         break
         }
      }
      for (j=0; j<copilotName.value.length; j++) {
         if(nonLetterArray.includes(copilotName.value[j])) {
         alert("Please correct Co-pilot Name. "+copilotName.value + " is not a valid name")
         displayFaultyItems = false;
         submitForm = false;
         event.preventDefault();
         break
         }
      }
      if(isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert("Please enter a valid number for both Fuel Level and Cargo Mass.")
         displayFaultyItems = false;
         submitForm = false;
         event.preventDefault();
      }
      if(displayFaultyItems){
         if(fuelLevel.value < 10000){
            faultyItems.style.visibility="visible"
            launchStatus.style.color = "red"
            launchStatus.innerHTML="Shuttle not ready for launch"
            pilotStatus.innerHTML = `${pilotName.value} is ready for launch.`
            copilotStatus.innerHTML = `${copilotName.value} is ready for launch.`
            fuelStatus.innerHTML = `Fuel level too low for launch`
            submitForm = false;
            event.preventDefault()
         }
         if(cargoMass.value > 10000){
            faultyItems.style.visibility="visible"
            launchStatus.style.color = "red"
            launchStatus.innerHTML="Shuttle not ready for launch"
            pilotStatus.innerHTML = `${pilotName.value} is ready for launch.`
            copilotStatus.innerHTML = `${copilotName.value} is ready for launch.`
            cargoStatus.innerHTML = `Too much mass for shuttle to take off.`
            submitForm = false;
            event.preventDefault()
         }
      }
      if(submitForm){
      launchStatus.innerHTML="Shuttle is ready for launch"
      launchStatus.style.color = "green"
      }
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         let index = Math.floor(Math.random()*json.length)
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `
      })
   })
});



