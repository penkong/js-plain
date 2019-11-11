const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingfor: 'male',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingfor: 'female',
    location: 'Lynn MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  }
];

const profiles = profileIterator(data);

// next events
document.getElementById('next').addEventListener('click', nextProfile);

// next profile diplay
function nextProfile() {
  const currProfile = profiles.next().value;
  if (currProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currProfile.name}</li>
        <li class="list-group-item">Name: ${currProfile.age}</li>
        <li class="list-group-item">Name: ${currProfile.location}</li>
        <li class="list-group-item">Name: ${currProfile.gender} looking for ${currProfile.lookingfor}</li>
      </ul>
    `;

    document.getElementById(
      'imageDisplay'
    ).innerHTML = `<img src=${currProfile.image}>`;
  } else {
    location.reload();
  }
}

function profileIterator(profiles) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    }
  };
}
