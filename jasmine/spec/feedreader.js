/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?  
         */
        it('rss feed is defined and a feed object/s have populated the allFeeds array', () => {
            //ensure the allFeeds is defined
            expect(allFeeds).toBeDefined();
            //ensure the allFeeds is populated
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed has url defined', () => {
            for(let feed of allFeeds){
                //console.log(feed); i used this to test if my loop worked            
                expect(feed.url).toBeDefined();
                //if the test returned expected undefined to be defined it simply means it expected the url which is now undefined to be defined
                expect(feed.url.length).not.toBe(0);
                //if when running the test you got expected 0 not to be 0 this means it expected the url length not to be empty 0
                //can take out some url's and mess around with them in app.js to see if tests work + to get used to testing with Jasmine
                expect(feed.url).toMatch("http");
                //i just want to make sure the url cantains an actual http address
            }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed has a name defined', () => {
            for(let feed of allFeeds){

                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                //Check if the feed name is a string
               expect(feed.name).toEqual(jasmine.any(String));
            }

         });
    });


        /*A new test suite named "The menu" */
    describe("The menu", () => { 
           //query the body element and assign body variable in outer scope now it can be accessed by both tests below
            const body = document.querySelector('body')      
         /* A test that ensures the menu element is
          * hidden by default. You'll have to analyze the HTML and
          * the CSS to determine how we're performing the
          * hiding/showing of the menu element.
          */
         it('menu has an is hidden element by default', () => {
            //body element queried above here expect it’s class list to contain “menu-hidden” if it does it will be true.
            
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

           /*A test that ensures the menu changes
           * visibility when the menu icon is clicked. This test
           * should have two expectations: does the menu icon display 
           * when clicked and does it hide when clicked again.
           */          
          it("toggles on: menu display when clicked and toggles off: menu hide when clicked again is working", () => {
            //define variables for DOM elements needed
            const menu = document.querySelector(".menu-icon-link");
            //call the click() function on the element with the menu-icon-link
            menu.click();
            //one way of checking if the menu-hidden is toggled off when menu hamburger icon is clicked
            expect(body.classList.contains('.menu-hidden')).toBe(false);

            menu.click();
            //one way of checking if the menu-hidden is toggled on when menu hamburger icon is clicked as could code expect(body.classList.contains('.menu-hidden')).toBe(true);

            expect(body.className).toContain('menu-hidden');

              });
    });

    // a new test suite named "Initial Entries" 
    describe("Initial Entries", () => {
         /*A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */         
         //before the tests run check that loadFeed has been called so i call loadFeed(0) once via index 0 inserted 
         beforeEach(function(done){
            //done gets used in our callback cb function in the loadFeed function in app.js 
            //meaning we can pass a function that let’s our Jasmine test know that our before each function has “finished” and proceed with our test
            loadFeed(0, done);
         });

         it('We see 1 or more .entry within .feed after loadFeed() runs. loadFeed is called + completes work successfully asynchronously', () => {
            const feed = document.querySelector('.feed');
            //expect(feed.children.length > 0).toBe(true); if i used this line to test it could later fail by .feed getting populated by an element that has a dif class to .entry 
            //so instead i wrote my test to specifically look for the elemet with .entry class inside of .feed
            //best practice to be as specific as posible in test target exactly what you seek at its dom level
            //query .feed and get its element with class name of .entry
            const feedEntriesLength = document.querySelector(".feed").getElementsByClassName("entry").length; 
            //expect  an element to have a class of at least one .entry 
            expect(feedEntriesLength).toBeGreaterThan(0); 

         });

    });

     /* A test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous. */    
    describe("New Feed Selection", () => {        

            //we need to use feed in both functions so I define it here the outer function scope all inner functions have open access to it now
            const feed = document.querySelector('.feed');
            //store the first feed’s content in a new empty array variable called firstFeed:
            //define variable of expected irst feed content = assign it a value below
            let firstFeedContent;

        beforeEach( (done) => {
            //difference between this test and the one before, is we need to load 2 different feeds and check that the feed content changes
            //done() can only be called once, we call it in the final async loadFeed() function below to let Jasmine know when to continue
          loadFeed(0, () =>{

                        let firstFeedContent = document.querySelector('.feed').innerHTML;

                loadFeed(1, () => {
                     //done() can only be called once, we call it in the final async loadFeed() function below to let Jasmine know when to continue
                    done();
                });                        
          });
        }); 
        //here we check if the content inside the first loadFeed is different from the content in side the second loadFeed call
        it("feed content changes when two different loadFeed() are called", ((done) => {
                //i called the async loadFeed a second time and after it is done i store its inner HTML in a variable to compare later
                let newFeedContent = document.querySelector(".feed").innerHTML;
                expect(firstFeedContent).not.toBe(newFeedContent);
                 //done() can only be called once, we call it in the final async loadFeed() function below to let Jasmine know when to continue
                done();
        }));

    }); 

}());

// Project 5 Feed Reader Testing with Jasmine
// Code reused from the following sources:
// The starter code for this project comes from the following Udacity GitHub address of https://github.com/udacity/frontend-nanodegree-feedreader. I forked it to my git repo and cloned it.
// Some code Mohamed Riaad study jam at https://www.youtube.com/watch?v=Ut_L8YUImbw&index=6&list=PLpRo6-g-F-AOUsTQbKY1EYNpqXtxCT4a-&t=27s  
// Some code from the walkthrough tutorials by Matthew Cranford at https://matthewcranford.com.
// Some code from Daniela Kuester project https://github.com/DanielaKuester helped me understnad async with arrow functions 