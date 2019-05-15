function userInformationHTML(user) {
    return `<h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" alt="Profile Image" width="80px" heigh="80px"></a>
            </div>
            <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>`;
}

function repoInformationHTML(repo) {
    if (repo.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    } 
    var listItemHTML = repo.map(function(repo) {
        return `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
    });
    return `<div class="clearfix repo-list">
        <p><strong>Repo List:</strong></p>
        <ul>
            ${listItemHTML.join('\n')}
        </ul>
        </div>`;
}


function fetchGitHubInformation(event) {
    $('#gh-user-data').html("");
    $('#gh-repo-data').html("");
    var username = $('#gh-username').val();
    if (!username) {
        $('#gh-user-data').html('<h2>Please enter a GitHub username');
        return;
    }
    
    $('#gh-user-data').html(
        `<div if="loader">
            <img src="assets/css/loading.gif" alt="loading..." />
            </div>`);
        
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse.status == 404) {
                $('#gh-user-data').html(`<h2>No info found for user ${username}</h2>`);
            } else if (errorResponse.status == 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $('#gh-user-data').html(`<h4>Too many request, please wait until ${resetTime.toLocaleString()} and try again</h4>`);
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }
    );
}

$(document).ready(fetchGitHubInformation);