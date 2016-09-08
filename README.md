# Performance_Optimization
Apply the skills learned for optimization of graphics, HTML, CSS, and JavaScript to take a poorly optimized site and reduce the total load size to under 1.3mb and total requests to less than 27. Students will need to analyze the assets they've been provided to see where optimizations can and need to be made, make those optimizations, and measure their success. Multiple analyzation, optimization, and measuring cycles may be required.

Notes:

-Google page speed +  node phantomas/http-server via npm start in command line to test in separate testing directory on desktop

-used tasks gulp imagesOpt and gulp images in gulpfile.js to optimize images that are then pipe from the src development directory to the dist (ie., public) directory.

-all other files are concatenated, minified, and optimized via the default gulp task via running "gulp" in the terminal

-to work on development stage files separately before compiling nd transferring over to the dist folder, type src directory path into the command line and run gulp browser-sync and sass --watch scss:css into terminal before switching back to main directory to run gulp (or open new terminal window with separate path).

//Cutting down on http requests via image sprites:

-created two separate image sprites for the avatars due to different images sizes (and the associated coordinates generated as a result)...used spritepad tool online to generate sprites after cropping images in Photoshop to get correct CSS/size dimensions.

-converted social png images into svg images, then created an SVG sprite after the body tag via one <svg> element with <symbol> and <path> elements to represent each social icon in the sprite....then included towards bottom of page with <use> element. EX: <svg style="width:50px;">
    <use xlink:href="#twitter"></use>
</svg>
