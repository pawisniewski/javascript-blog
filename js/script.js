{
  'use strict';
  /*
  document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
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
    // eslint-disable-next-line no-unused-vars
    optArticleAuthorSelector = '.post-author';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){

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
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into html variable */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){

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
        const linkHTML = '<li>&nbsp;<a href="#tag-' + tag + '"><span>' + tag + '</span></a>&nbsp;</li>';

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;

      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      articleTagsList.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }
  }
  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){

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
  }


  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for(let linkToTag of allLinksToTags){

      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();
}
