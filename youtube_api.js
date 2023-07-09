
document.getElementById('btn').addEventListener('click',()=>{
  
  if(document.getElementById('imgg')){
    document.getElementById('imgg').remove()
  }
  if(document.getElementById('channelName')){
    document.getElementById('channelName').innerHTML = ''
  }
  if(document.getElementById('sub')){
    document.getElementById('sub').innerHTML = ''
  }
  document.getElementById('container').innerHTML = ''

  // abc()
})

const inputVal = document.getElementById('inp')


function abc() {
  const url = 'https://youtube-search-and-download.p.rapidapi.com/channel';
  const params = new URLSearchParams({
    id: inputVal.value,
    sort: 'n'
  });

  const headers = {
    'X-RapidAPI-Key': '915b7cbfb5msh3210cbf7172e3fcp12f8a9jsn8059a602d398',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  };
  
  try {

    const apiCall = `${url}?${params}`


    fetch(apiCall, {
      method: 'GET',
      headers: headers
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data)

        
        
        const channelName = document.createElement('h1')
        channelName.setAttribute('id','channelName')
        channelName.innerHTML = data.title

        const sub = document.createElement('p')
        sub.setAttribute('id','sub')
        sub.innerHTML = data.subscriberCountText

      
        const profile_img = document.createElement('img')
        profile_img.setAttribute('id','imgg')
        profile_img.src = data.avatar.thumbnails[0].url

        const set = document.createElement('div')
        set.append(channelName,sub)



        const channel = document.createElement('div')
        channel.setAttribute('id','channel')
        channel.append(profile_img,set)
    
        const channelUrl = document.createElement('a')
        channelUrl.setAttribute('id','channelUrl')
        channelUrl.href = data.vanityChannelUrl
        channelUrl.appendChild(channel)

        const channelDetails = document.getElementById('channelDetails')
        channelDetails.append(channelUrl)


        const contents = data.contents
        contents.forEach((content)=>{
          
          const title = document.createElement('p')
          title.textContent = content.video.title
          title.setAttribute('id','title')


          const viewCountText = document.createElement('p')
          viewCountText.textContent = content.video.viewCountText
          viewCountText.setAttribute('id','viewCountText')

          

          const thumbnails = document.createElement('img')
          thumbnails.src = content.video.thumbnails[3].url
          thumbnails.setAttribute('id','thumbnails')



          const lengthText = document.createElement('p')
          lengthText.textContent = content.video.lengthText
          lengthText.setAttribute('id','lengthText')



          const imgContainer = document.createElement('div')
          imgContainer.setAttribute('id','imgContainer')
          imgContainer.append(thumbnails,lengthText)


          const videoId = document.createElement('a')
          videoId.href = `https://www.youtube.com/watch?v=${content.video.videoId}`
          videoId.setAttribute('id','videoId')


          videoId.append(imgContainer,title,viewCountText)

          document.getElementById('container').append(videoId)

        })
        
        

      })
    .catch((err)=>console.log('err :',err))
    
  } catch (error) {
    console.error('errorrrrrrrrrrrrr :',error);
  }
}



