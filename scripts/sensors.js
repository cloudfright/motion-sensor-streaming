let isStreaming = false;
let person = "js";

class ExponentialMovingAverage {
	constructor(alpha, mean) {
		this.alpha = alpha;
		this.mean = !mean ? 0 : mean;
	}

	get beta() {
		return 1 - this.alpha;
	}

    get filtered() {
		return this.mean;
	}

	update(newValue) {
		const redistributedMean = this.beta * this.mean;
		const meanIncrement = this.alpha * newValue;
		const newMean = redistributedMean + meanIncrement;
		this.mean = newMean;
	}
}

let smoothAx =  new ExponentialMovingAverage(0.5);
let smoothAy =  new ExponentialMovingAverage(0.5);
let smoothAz =  new ExponentialMovingAverage(0.5);

function requestPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleOrientation);
        } else {
          console.error('Request to access the orientation was rejected');
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener('devicemotion', handleOrientation);
  }
}

function handleOrientation(event) {
  sendSensorData(event);
}

function toggleStreaming() {
  let spinner = document.getElementById("spinner");

  if (isStreaming) {
    spinner.style.visibility = 'hidden';
    isStreaming = false;
  }
  else {
    spinner.style.visibility = 'visible';
    isStreaming = true;
  }
}

async function sendSensorData(event) {

  if (!isStreaming)
    return;

  /* Example data
DeviceMotionEvent {
  isTrusted: true, 
  acceleration: {x: -0.016416461668629197, y: -0.008223821129091084, z: 0.03818447696566581},
  accelerationIncludingGravity: {x: 0.03576176159707829, y: -0.26739436074271794, z: -9.764901108551024}, 
  rotationRate: {alpha: -0.1024065136597755, beta: 0.03143359110734988, gamma: 0.0017918174194308646}, 
  interval: 0.01666666753590107, …} 
*/

smoothAx.update(event.acceleration.x);
smoothAy.update(event.acceleration.y);
smoothAz.update(event.acceleration.z);

  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partitionKey: person,
        rowKey: Date.now(),
        ax: event.acceleration.x,
        ay: event.acceleration.y,
        az: event.acceleration.z,
        agx: event.accelerationIncludingGravity.x - event.acceleration.x,
        agy: event.accelerationIncludingGravity.y - event.acceleration.y,
        agz: event.accelerationIncludingGravity.z - event.acceleration.z,
        // ra: event.rotationRate.alpha,
        // rb: event.rotationRate.beta,
        // rg: event.rotationRate.gamma
        
        // test the smoothed values
        sx: smoothAx.filtered,
        sy: smoothAy.filtered,
        sz: smoothAz.filtered,
      })
    });
  } catch (error) {
    console.log(error);
  }
}
// https://docs.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=vanilla-javascript
// https://docs.microsoft.com/en-us/rest/api/storageservices/designing-a-scalable-partitioning-strategy-for-azure-table-storage
// https://trekhleb.dev/blog/2021/gyro-web/


function selectPerson(button) {
  person = button.getAttribute("data-person");
}
