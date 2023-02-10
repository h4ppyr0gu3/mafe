import svg from '../assets/hero.svg';
import construction from '../assets/construction.svg';

export default function Landing() {
  return (
    <>
      <div class="bg-gray-800">
        <nav id="header" class="fixed w-full z-30 top-0 text-white bg-gray-600">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div class="pl-4 flex items-center">
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f47b.svg"/>
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f9e0.svg"/>
              <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                Ghost Brain
              </a>
            </div>
            <div class="block lg:hidden pr-4">
              <button id="nav-toggle" class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-900 lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
              <ul class="list-reset lg:flex justify-end flex-1 items-center">
                <li class="mr-3">
                  <a class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="#">Blog</a>
                </li>
                <li class="mr-3">
                  <a class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="/sign_in">Log In</a>
                </li>
              </ul>
              <a href="/sign_up"
                id="navAction"
                class="mx-auto lg:mx-0 hover:underline bg-gray-800 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Sign Up
              </a>
            </div>
          </div>
          <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
        <div class="pt-24 bg-gray-300">
          <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p class="uppercase tracking-loose w-full">Learning Through Projects</p>
              <h1 class="my-4 text-5xl font-bold leading-tight">
                Take your Music offline
              </h1>
              <p class="leading-normal text-2xl mb-8">
                your music your choice, do with it what you please
              </p>
              <a href="/sign_up" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Sign Up
              </a>
            </div>
            <div class="w-full md:w-3/5 py-6 text-center">
              <img class="w-full md:w-4/5 z-50" src={svg} />
            </div>
          </div>
        </div>
        <div class="relative -mt-12 lg:-mt-24">
          <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
              </g>
              <g transform="translate(-4.000000, 76.000000)" fill="#758599" fill-rule="nonzero">
                <path
                  d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <section class="bg-gray-400 border-b py-8">
          <div class="container max-w-5xl mx-auto m-8">
            <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Mapp by Ghost Brain
            </h2>
            <div class="w-full mb-4">
              <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-5/6 sm:w-1/2 p-6">
                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Providing little value but much knowledge
                </h3>
                <p class="text-gray-600 mb-8">
                  This project is a testing ground for crazy engineering whilst being useful to only the author, this is not for commercial use.
                  <br />
                  <br />
                  Images from:  
                  <a class="text-pink-500 underline" href="https://undraw.co/">undraw.co</a>
                </p>
              </div>
              <div class="w-full sm:w-1/2 p-6">
                <img class="w-full sm h-64 mx-auto" src={construction}/>
              </div>
            </div>
          </div>
        </section>
        <footer class="bg-gray-600">
          <div class="container mx-auto px-8">
            <div class="w-full flex flex-col md:flex-row py-6">
              <div class="flex-1 mb-6 text-black">
                <div class="flex flex-row">
                  <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f47b.svg"/>
                  <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f9e0.svg"/>
                  <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                    Ghost Brain
                  </a>
                </div>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Links</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</a>
                  </li>
                </ul>
</div>
<div class="flex-1">
<p class="uppercase text-gray-500 md:mb-6">Legal</p>
<ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a>
                  </li>
                </ul>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Social</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a>
                  </li>
                </ul>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Company</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <a href="https://www.freepik.com/free-photos-vectors/background" class="text-gray-500">Background vector created by freepik - www.freepik.com</a>
        </footer>
      </div>
      </>
  );
}
