function handleLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const profilePicInput = document.querySelector('input[name="profilePic"]:checked');
  
    if (!username || !password || !profilePicInput) {
      alert("Please fill all fields and select a profile picture.");
      return;
    }
  
    const profilePic = profilePicInput.value;
    let accounts = JSON.parse(localStorage.getItem("rantgram_accounts")) || {};
  
    if (accounts[username]) {
      if (accounts[username].password !== password) {
        alert("Incorrect password.");
        return;
      }
    } else {
      accounts[username] = {
        username,
        password,
        profilePic,
        rants: []
      };
    }
  
    localStorage.setItem("rantgram_accounts", JSON.stringify(accounts));
    localStorage.setItem("currentUser", username);
    showRantPage(accounts[username]);
  }
  
  function showRantPage(user) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("profilePage").classList.remove("hidden");
    document.getElementById("feedPage").classList.remove("hidden");
  
    document.getElementById("userPic").src = user.profilePic;
    document.getElementById("usernameTitle").innerText = user.username;
  
    loadRants(user);
  }
  
  function postRant() {
    const rantInput = document.getElementById("rantInput");
    const rant = rantInput.value.trim();
    if (!rant) return;
  
    const username = localStorage.getItem("currentUser");
    let accounts = JSON.parse(localStorage.getItem("rantgram_accounts")) || {};
    const user = accounts[username];
  
    user.rants.unshift(rant);
    accounts[username] = user;
  
    localStorage.setItem("rantgram_accounts", JSON.stringify(accounts));
    rantInput.value = '';
    loadRants(user);
  }
  
  function loadRants(user) {
    const rantFeed = document.getElementById("rantFeed");
    rantFeed.innerHTML = '';
    user.rants.forEach(r => {
      const post = document.createElement("div");
      post.className = "rant";
      post.innerHTML = `<strong>${user.username}:</strong> ${r}`;
      rantFeed.appendChild(post);
    });
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("loginForm").reset();
    document.getElementById("rantFeed").innerHTML = "";
    document.getElementById("userPic").src = "";
    document.getElementById("usernameTitle").innerText = "";
  
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("profilePage").classList.add("hidden");
    document.getElementById("feedPage").classList.add("hidden");
  }
  
  function showFeed() {
    document.getElementById("feedPage").classList.remove("hidden");
    document.getElementById("profilePage").classList.add("hidden");
  }
  
  function showProfile() {
    document.getElementById("feedPage").classList.add("hidden");
    document.getElementById("profilePage").classList.remove("hidden");
  }
  
  window.onload = () => {
    const username = localStorage.getItem("currentUser");
    if (username) {
      const accounts = JSON.parse(localStorage.getItem("rantgram_accounts"));
      if (accounts && accounts[username]) {
        showRantPage(accounts[username]);
      }
    }
  
    document.querySelectorAll('.profile-pics label').forEach(label => {
      label.addEventListener('click', () => {
        document.querySelectorAll('.profile-pics img').forEach(img => {
          img.style.border = '2px solid transparent';
        });
        label.querySelector('img').style.border = '2px solid #4267B2';
        label.querySelector('input').checked = true;
      });
    });
  };
  