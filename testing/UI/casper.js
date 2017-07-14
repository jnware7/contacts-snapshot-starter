var url = "http://localhost:3000/"

casper.test.begin('Testing the page status', function(test){
  casper.start(url,function(){
    test.assertHttpStatus(200,'Page is up and running')
  })
  casper.then(function(){
    test.assert(casper.getCurrentUrl() === url, 'URL is the one expected')
  })
  casper.then(function(){
    test.assertTextExists('Jared','Jared has not been removed')
    test.assertTextExists('Tanner','Tanner has not been removed')
  })
  casper.thenEvaluate(function(){
    document.querySelector('.delete-contact').click('.delete-contact')
  })
  casper.then(function(){
    test.assertTextDoesntExist('Jared','Jared has been removed')
    test.assertTextExists('Tanner','Tanner has not been removed')
  })

  casper.thenEvaluate(function(term){
    document.querySelector('input[name="q"]').setAttribute('value', term)
    document.querySelector('input[type="submit"]').submit()
  },  {term:"Tanner"})

  casper.then(function(){
    test.assertTextDoesntExist('Jeff','Jeff is not found')
    test.assertTextExists('Tanner','Tanner is found')
  })

  casper.run(function(){
    test.done()
  })
})

//goes to contacts page
//clicking delete button
//testing for removed element

casper.test.begin('Testing the page status', function(test){
  casper.start(url,function(){
    test.assertHttpStatus(200,'Page is up and running')
  })

  casper.thenEvaluate(function(){
    document.querySelector('.delete-contact').click('.delete-contact')
  })
  casper.setFilter('page.confirm',function(popup){
    // console.log("popup==>",popup)
    return popup === "Are you sure you want to delete this contact?" ? true : false
  })
  casper.then(function(){
    // console.log(casper.getPageContent())
    test.assertTextDoesntExist('Jared','Jared is deleted')
  })
  casper.run(function(){
    test.done()
  })
})
