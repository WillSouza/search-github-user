(function(){
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id = "4ef6a3d04a1fb8d42f68";
    const client_secret = "f8d475a76a1aae4a72c6c664bd3b310ce8a90b35";
    const count = 2000;
    const sort  = "created: asc";

    
    async function getUser(user){
        const profileResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);
        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`);
        const starredResponse = await fetch(`${url}/${user}/starred?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`);
        
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        const starred = await starredResponse.json();

        return {profile, repos, starred} ;
    }

    function showProfile(user){
        profile.innerHTML = `<div class="row mt-3">
        <div class="col-md-4 col-lg-4" style="width: 18rem;">
            <img id="avatar" class="card-img-top" src="${user.avatar_url}"/>
            <div class="card mt-3" >
                <ul class="list-group list-group-flush ">
                    <li class="list-group-item">Usuário: <strong>${user.login}</strong></li>
                    <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                    <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                    <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver Perfil</a>
                </div>
            </div>
        </div>
        <div class="col-md-8 col-lg-8">
            <div id="repos" style="display:block;">
            
            </div>
            <div id="starred" style="display:none;" >
            
            </div>
        </div>
    </div>`;
    }

    function showRepos(repos){
        let output = '';

        repos.forEach(repo => {
            output += `<div class="card card-body mb-2">
                        <div class="row">
                            <div class="col-md-7"><a href="${repo.html_url}" target="_blank" >${repo.name}</a></div>
                            <div class="col-md-5">
                                <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                                <span class="badge badge-success">Watch: ${repo.watchers_count}</span>
                                <span class="badge badge-warning">Forks: ${repo.forks_count}</span>
                            </div>
                        </div>
                    </div>`
        });
 
        document.getElementById("repos").innerHTML = output;
        
    }

    function showStarred(starred){
        let output = '';

        starred.forEach(starred => {
            output += `<div class="card card-body mb-2">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="${starred.html_url}" target="_blank" >${starred.name}</a>
                                <p>${starred.description}</p>
                                <p><strong>Owner</strong>: <a href="${starred.owner.html_url}" target="_blank" >${starred.owner.login}</a></p>
                            </div>
                            <div class="col-md-6">
                                <span class="badge badge-primary">Stars: ${starred.stargazers_count}</span>
                                <span class="badge badge-success">Watch: ${starred.watchers_count}</span>
                                <span class="badge badge-warning">Forks: ${starred.forks_count}</span>
                                <span class="badge badge-dark">Language: ${starred.language}</span>
                            </div>
                        </div>
                    </div>`
        });
        document.getElementById("starred").innerHTML = output;
    }

    search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
                showStarred(res.starred);
            });
        }
        
       
    });
})();

$("#btnRepo").click(function(){
    $("#starred").slideUp('slow');
    setTimeout(() => {
        $("#repos").slideDown('slow');
    }, 1000);
});

$("#btnStarred").click(function(){
    $("#repos").slideUp('slow');
    setTimeout(() => {
        $("#starred").slideDown('slow');
    }, 1000);
});