
import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const subjectSelect = document.getElementById('subject');
const topicInput = document.getElementById('topic');
const matchResult = document.getElementById('match-result');

let currentUser = null;

export async function signUp() {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-up successful");
  } catch (error) {
    alert(error.message);
  }
}

export async function logIn() {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
  } catch (error) {
    alert(error.message);
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user-email').innerText = user.email;
  }
});

window.signUp = signUp;
window.logIn = logIn;
window.goOnline = goOnline;

async function goOnline() {
  const subject = subjectSelect.value;
  const topic = topicInput.value;

  const userRef = doc(db, 'users', currentUser.uid);
  await setDoc(userRef, {
    email: currentUser.email,
    subject: subject,
    topic: topic,
    online: true
  });

  findMatch(subject, topic);
}

async function findMatch(subject, topic) {
  const q = query(
    collection(db, 'users'),
    where('online', '==', true),
    where('subject', '==', subject),
    where('topic', '==', topic)
  );

  const querySnapshot = await getDocs(q);
  let matched = false;

  querySnapshot.forEach(doc => {
    if (doc.id !== currentUser.uid) {
      matchResult.innerText = `You matched with: ${doc.data().email}`;
      matched = true;
    }
  });

  if (!matched) {
    matchResult.innerText = 'No study partner found yet. Waiting...';

    onSnapshot(q, snapshot => {
      snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          matchResult.innerText = `Matched with: ${doc.data().email}`;
        }
      });
    });
  }
}
