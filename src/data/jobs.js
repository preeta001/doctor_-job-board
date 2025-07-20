const cities = [
  "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai",
  "Hyderabad", "Ahmedabad", "Pune", "Surat", "Jaipur"
];

const experiences = ["3+ years", "10+ years", "15+ years", "20+ years"];

const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "General Physician",
  "Gynecologist (OB/GYN)",
  "Radiologist",
  "Oncologist"
];


let id = 1;
const jobs = [];

specializations.forEach((spec) => {
  cities.forEach((city) => {
    experiences.forEach((exp) => {
      jobs.push({
        id: id++,
        title: spec,
        hospital: "Global Health Clinic",
        location: city,
        experience: exp,
        specialization: spec
      });
    });
  });
});

export default jobs;
export { cities, experiences, specializations };
