window.onload = (event) => {
  $(".loading").addClass("loading");
};
async function getUsers() {
  let url = "https://api.spacexdata.com/v3/launches?limit=8";
  try {
    let res = await fetch(url);
    if (res.status === 200) {
      $(".loading").removeClass("loading");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    alert("error" + error);
  }
}
async function renderUsers() {
  let users = await getUsers();
  console.log(users);
  let html = "";
  users.map((user) => {
    let htmlSegment = `
            <div class="col-md-3">
                <div class="user">
                    <img src="${user.links.mission_patch}" class="img-responsive" />
                    <div class="details__data">
                        <p><span style="color: blue"><b>mission_name#</b></span> ${user.mission_name}</p>
                        <p><span><b>launch_success</b></span> ${user.launch_success}</p>
                        <p><span><b>launch_year</b></span> ${user.launch_year}</p>
                        <p><span><b>launch_success</b></span> ${user.launch_success}</p>
                </div>
            </div>
        </div> 
    `;

    html += htmlSegment;
  });

  let space__data = document.querySelector(".space__data");
  space__data.innerHTML = html;
}

renderUsers();

// filter by laun and land && date
$(document).ready(function () {
  $("body").addClass("loading");
  $(".btn").click(function () {
    var date = $(this).attr("value");
    console.log(date);
    fetch(
      "https://api.spacexdata.com/v3/launches?limit=4&amp;launch_success=true&amp;land_success=true&amp;launch_year=" +
        `${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        $("body").removeClass("loading");
        console.log(data);
        let filter = "";
        data.map((user) => {
          let filterSegment = `
            <div class="">
                <div class="col-md-3 col-sm-3 col-xs-12">
                        <div class="user">
                            <img src="${user.links.mission_patch}" class="img-responsive" />
                            <div class="details__data">
                                <p><span style="color: blue"><b>mission_name#</b></span> ${user.mission_name}</p>
                                <p><span><b>launch_success</b></span> ${user.launch_success}</p>
                                <p><span><b>launch_year</b></span> ${user.launch_year}</p>
                                <p><span><b>launch_success</b></span> ${user.launch_success}</p>
                        </div>
                    </div>
                </div>
            </div>
          `;

          filter += filterSegment;
        });
        let space__data = document.querySelector(".space__data");
        space__data.innerHTML = filter;
      });
  });
  // filter by laun and land && date
  //   filter list
  $("#launc__year").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".laun--date").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  // filter list
});
// search input
// success launch
