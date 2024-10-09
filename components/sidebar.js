class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const page = this.getAttribute('data-page');

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Extract user details from userData
    const firstName = userData.first_name || 'Coach';
    const lastName = userData.last_name || 'User';
    const fullName = `${firstName} ${lastName}`;
    const role = userData.slug ? userData.slug.split('-')[1] : 'Role'; // Assuming 'slug' contains some indication of the role
    const email = userData.official_email_id || 'email@example.com';
    const profileImage = 'images/receptionist.png'; // Assuming a default image

    this.innerHTML = `
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
              <li class="nav-item mb-4">
                  <div class="text-center">
                      <img src="${profileImage}" class="image-edit-in-mini-sidebar" style="width:100%;padding: 5px 25px 0px 25px;">
                      <h4 class="hide-in-mini-sidebar text-white" style="font-size:16px;font-weight: 700;margin-bottom:6px">${fullName}</h4>
                      <h4 class="hide-in-mini-sidebar" style="font-size:12px; color:#FFFFFFCC;">${role}</h4>
                      <h5 class="hide-in-mini-sidebar" style="font-size:10px; color:#FFFFFFCC;">${email}</h5>
                  </div>
              </li>
              <div class="nav-menus">
                <a href="">
                <li class="nav-item">
                  <div class="nav-link" >
                    <img src="images/dashboard.png">
                    <span class="menu-title">Dashboard</span>
                  </div>
                </li>
                </a>
                <a href="">
                  <li class="nav-item">
                    <div class="nav-link" >
                      <img src="images/meetings.png">
                      <span class="menu-title">Booking management</span>
                    </div>
                  </li>
                </a>
                <a href="courses.html">
                  <li class="nav-item ${page == 'courses' ? 'active' : ''}">
                    <div class="nav-link" >
                      <img src="images/package.png">
                      <span class="menu-title">Courses</span>
                    </div>
                  </li>
                </a>
                <a href="session-planning.html">
                  <li class="nav-item ${page == 'Session-planning' ? 'active' : ''}">
                    <div class="nav-link" >
                      <img src="images/session.png">
                      <span class="menu-title">Session planning & <br>Reflection sheet</span>
                    </div>
                  </li>
                </a>
                <a href="coach-workstation.html">
                  <li class="nav-item ${page == 'Coach-Workstation' ? 'active' : ''}">
                    <div class="nav-link" >
                      <img src="images/coach-workstation.png">
                      <span class="menu-title">Coach Workstation</span>
                    </div>
                  </li>
                </a>
                <a href="">
                  <li class="nav-item">
                    <div class="nav-link" >
                      <img src="images/reports.png">
                      <span class="menu-title">Reports</span>
                    </div>
                  </li>
                </a>
                <a href="">
                  <li class="nav-item">
                    <div class="nav-link" >
                      <img src="images/notifications.png">
                      <span class="menu-title">Notifications</span>
                    </div>
                  </li>
                </a>
                <a href="student-goals.html">
                  <li class="nav-item ${page == 'student-goals' ? 'active' : ''}">
                    <div class="nav-link" >
                      <img src="images/goals.png">
                      <span class="menu-title">Student Goals</span>
                    </div>
                  </li>
                </a>
                 <a href="billing.html">
                  <li class="nav-item ${page == 'billing' ? 'active' : ''}">
                    <div class="nav-link" >
                      <img src="images/billings.png">
                      <span class="menu-title">Billings</span>
                    </div>
                  </li>
                </a>
                <a href="">
                  <li class="nav-item">
                    <div class="nav-link" >
                      <img src="images/settings.png">
                      <span class="menu-title">Settings</span>
                    </div>
                  </li>
                </a>
              </div>
          </ul>
      </nav>
    `;
  }
}

customElements.define('sidebar-component', Sidebar);
