module.exports = (blood) => {
  const bloodTypes = {
    A1: "A+",
    A0: "A-",
    B1: "B+",
    B0: "B-",
    AB1: "AB+",
    AB0: "AB-",
    O1: "O+",
    O0: "O-"
  }

  return bloodTypes[blood];
}