#define heaterSelPin 15
#define RS_air 1044
#define Servo1Pin 9
#define Servo2Pin 6
#define pushPin 8

#include <Servo.h>

float threshold = 0.1;
float ratio;
float sensor_volt;
 float RS_gas; // Get value of RS in a GAS

Servo myservo;  // create servo object to control a servo
Servo myservo2;            // twelve servo objects can be created on most boards

void setup() {

  Serial.begin(9600);
  pinMode(heaterSelPin, OUTPUT);  // set the heaterSelPin as digital output.
  pinMode(pushPin, INPUT);
  digitalWrite(heaterSelPin, LOW); // Start to heat the sensor
  float ratio = threshold;
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo2.attach(6);
  lockGun();
}

void loop() {

  /*-Replace the name "R0" with the value of R0 in the demo of First Test -*/
  if (digitalRead(pushPin)) {
    int sensorValue = analogRead(A0);
    sensor_volt = (float)sensorValue / 1024 * 5.0;
    RS_gas = sensor_volt / (5.0 - sensor_volt);
    for (int i = 0; i < 5; i++) {
      int sensorValue = analogRead(A0);
      sensor_volt = (float)sensorValue / 1024 * 5.0;
      if (RS_gas >= sensor_volt / (5.0 - sensor_volt)) {
        RS_gas = sensor_volt / (5.0 - sensor_volt);
      }
      delay(1000);
      ratio = RS_gas / RS_air; // ratio = RS/R0
    }
    Serial.print("sensor_volt = ");
    Serial.println(sensor_volt);
    Serial.print("RS_ratio = ");
    Serial.println(RS_gas);
    Serial.print("Rs/R0 = ");
    Serial.println(ratio);

    /*-----------------------------------------------------------------------*/
    if (ratio < threshold) {
      lockGun();
    } else {
      unlockGun();
    }


    Serial.print("\n\n");
  }
  delay(100);
}

void lockGun() {
  myservo.write(90);
  delay(15);
  myservo2.write(90);                                 // tell servo to go to position in variable 'pos'
  delay(15);
}

void unlockGun() {
  myservo.write(0);
  delay(15);
  myservo2.write(180);                                 // tell servo to go to position in variable 'pos'
  delay(15);
}

