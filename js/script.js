{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    //optTagsListSelector = '.tags .list',
    //optAuthorsListSelector = '.authors .list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';


  const generateTitleLinks = function(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into html variable */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();


  const calculateTagsParams = function(allTags){
    const params = {
      max: 0,
      min: 999999,
    };
    for(let tag in allTags){
      console.log(tag + ' is used ' + allTags[tag] + ' times');

      if(allTags[tag] > params.max){
        params.max = allTags[tag];
      }
      if(allTags[tag] < params.min){
        params.min = allTags[tag];
      }
    }
    return params;
  };


  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  };


  const generateTags = function(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const articleTagsList = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* [DONE] generate HTML of the link */
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        //const linkHTML = '<li>&nbsp;<a href="#tag-' + tag + '"><span>' + tag + '</span></a>&nbsp;</li>';

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      articleTagsList.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};
    //let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagLinkHTML = '<li>&nbsp;<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>&nbsp;</li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      //allTagsHTML += tagLinkHTML;
      //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';

    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  };
  generateTags();


  const tagClickHandler = function(event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log(event);
    console.log('clickedElement:', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
    for(let activeTag of activeTags){

      /* [DONE] remove class active */
      activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href +'"]');

    /* [DONE] START LOOP: for each found tag link */
    for(let tagLink of tagLinks){

      /* [DONE] add class active */
      tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };


  const addClickListenersToTags = function(){
    /* [DONE] find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for(let linkToTag of allLinksToTags){

      /* [DONE] add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToTags();


  const generateAuthors = function(){

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find author wrapper */
      const articleAuthorList = article.querySelector(optArticleAuthorSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      //const linkHTML = '&nbsp;<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {

        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* [DONE] insert HTML of all the links into the author wrapper */
      articleAuthorList.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = { authors: [] };
    //let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
      //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')</a></li>';

    /* [NEW] END LOOP: for each author in allAuthors: */
    }
    /*[NEW] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log(allAuthorsData);
  };
  generateAuthors();


  const authorClickHandler = function(event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Author was clicked!');
    console.log(event);
    console.log('clickedElement:', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active author link */
    for(let activeAuthor of activeAuthors){

      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active author link */
    }
    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href +'"]');

    /* [DONE] START LOOP: for each found tag link */
    for(let authorLink of authorLinks){

      /* [DONE] add class active */
      authorLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };


  const addClickListenersToAuthors = function(){
    /* [DONE] find all links to tags */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */
    for(let linkToAuthor of allLinksToAuthors){

      /* [DONE] add tagClickHandler as event listener for that link */
      linkToAuthor.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}
