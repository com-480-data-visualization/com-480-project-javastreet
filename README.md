# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|     Kooli      | 269603 |
|     Wildi      | 260594 |
|     Schmider   | 274431 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### 1. Dataset
We chose to devote our data visualization project to Android applications. Our data comes from the website [androidrank.org](https://www.androidrank.org), which displays in a very clean manner open information about the 500 most downloaded apps in each category of the Google Play Store. The characteristics provided are the following: number of ratings and installs, average rating, growth in number of reviews for the last 30 and 60 days and finally price. Here is an example of what it looks like :


![Overview of the data available at androidrank.org](res/overview.PNG)


The chosen data will not require much pre-processing as it was already well-structured but did require a certain amount of time of scraping. We chose this solution over the existing dataset [Google Play Store Apps](https://www.kaggle.com/lava18/google-play-store-apps) available on Kaggle, because there was no indication on how the selection of the 10’000 apps it presents was made, thus hindering the possibility of displaying meaningful informations from it.

Besides, the data provided on [androidrank.org](https://www.androidrank.org) are up-to-date, which is a considerable advantage in the context of the ever-changing market that are mobile applications. Finally, an API is provided to get more details about the evolution of a particular application, for instance the dates when the app crossed the different number of installations milestones as well as the evolution of the distribution of ratings. This would allow us to do add a more in-depth visualization for a selected group of apps.


### 2. Problematic
We will thus try to show what makes an app successful, especially what are the key characteristics of an app (prize, genre, etc.) that have the greater importance in an app’s success. For the most successful apps, we will also try to visualize and compare the evolution of this success during time.

This is moreover something that could be interesting to anyone since nowadays more than 40% of the population owns a smartphone, in which apps hold a very significant place. This is the reason why we chose to display the results in the form of a smartphone. This idea is more developed in the 4th part, and will be even more explained in the Milestone 2.

### 3. Exploratory Data Analysis
We started the exploration of the dataset with some basic statistics to have a general idea of what we were dealing with. You can find all the initial analysis on the Python notebook [analysis2.ipynb](analysis2.ipynb) with comments that describe all the processing.

The used dataset was generally clean and ready-to-use as explained before, but because of a limited number of requests during the parsing, the data had to be acquired in a few steps. The saved dataframes were then merged together, removing the potential duplicates. 

After that, we started to analyze the data by proceeding to basic statistics. We could for instance see that only 0.5% of apps in the dataset are paid apps, which was less than we expected. Moreover, we observed that looking at the most installed apps and the most reviewed ones gives two different rankings, which shows that ranking the apps could maybe be done using a balance between the two criteria.

Finally, after analyzing the growth of the apps reviews, we saw that some unexpected (according to us) categories had the higher growth such as *Art & Design* or *Video Players*. The growth of the latter may be explained by the containment that led many people to actively watch videos through apps. Let's note that the growth is sometimes not very representative since it's only a percentage and thus going from 0 to 1’000 reviews give a much higher growth than going from 1’000’000 to 1’001’00 reviews. So we will have to also find a balance in order to include this parameter in our analysis.

### 4. Related Work
We can easily find a few plots showing the most successful apps on the stores. However most of them are only based on the number of downloads. After starting to explore the dataset (cf. part 3), we started to think of a more complete score, meaning that our ranking of the most successful apps will not only be based on the downloads but also on other criteria such as ratings. This way, we could maybe have a more representative ranking of the apps success.

Moreover, as explained previously, the data will be displayed in the form of a smartphone where its apps will give access to the visualised results. It will then be directly related to the content itself and will also make the interface more user-friendly. People using the data will find it easy to jump from a result to another since they are used to this kind of interaction with their own smartphone, but the concept will this time be used as a data visualization technique.




## Milestone 2 (Friday 1st May, 5pm)

https://com-480-data-visualization.github.io/2020-project-guidelines/

------
Two pages describing the project goal
Sketches of final visualization
Needed tools from lecture
Breakdown goal into independent pieces. Minimal viable product required at the end
-------

Sometimes when a website contains a lot of information, the user will find some difficulties to access all the results. This is the reason why we wanted our final project to have a very clear display, with everything being easily accessible without the users having to look too much before finding what they need. Moreover, we wanted the visualization to also be related to the main topic, which is “what makes an Android app successful”. Thus, we chose to design the final website as a simple mobile phone that contains all our results. More precisely, it will be a smartphone with apps displayed on it like a real Android smartphone. This will make the final product very user-friendly since the users that are interested in this topic are most likely smartphone users as well. The mobile phone will be clickable and you can interact with it either with the buttons or with the apps. We can see on the SKETCH that it contains three buttons. Their functions are not completely defined yet, but some of the possible usages are: returning to the home screen, returning to the previous screen, changing the orientation… 
Let’s now talk about the apps. As previously said, the user can also interact with them with a click, which will open the app exactly as on a real smartphone. The interesting part is that each app will have its own design, which will make the visualization much more diverse. See for example two of the designed apps which look like Facebook (SCREEN) and Whatsapp (SCREEN). It can also make the user want to discover all the different app designs that could be found, and thus not miss any of the results we obtained. Indeed, the apps will not only be a tool for visualization, but also a way to separate all the different categories of results we obtained. Then, the app by itself will represent the second layer of depth, containing sub-categories of results. So the users will also be able to navigate inside the app through tabs for example like on the top of SCREEN.

For now, we thought of a welcoming text like a dialog in android to explain the project, how the website work and how we found these results. Then the user will see 7 apps that will be organized as follow: (The app name following the title of each parts corresponds to the design idea we are thinking of)
  
RANKING (Facebook): In this part the user will explore which apps are the more successful in a global ranking and in each categories. We will also detailed how we derived this ranking and this will lead the user to wonder why these app are so successful.
REPARTITION (Whatsapp): Here we will visualize the repartition of the paid/free app and the app containing ads or not among the Google Play Store. These repartitions will also be available for each categories and for the global top 500 which will show the user whether these criterion are a key to success. (In this part, depending on the results we will have we might also show information about the Size of the app)
DEVELOPERS (EPFL campus) : It is also important to see who developed these best apps. To see who the best developers are, we will rely on the number of app they develops, how much they reply to comments in the Google Play Store and how many times their app are downloaded on average.
REVIEWS (TBD): We will also show how the number of reviews changes over the last month. Then, for each app, we will plot how many stars they have. 
DOWNLOADS (YOUTUBE): We will plot the number of downloads in an evolutive graph like the one of the youtube channel Data is beautiful. 
COMMENTS (Twitter): We will highlight the most used word in the comments of the top apps and perhaps per category also if the results are relevant
CONCLUSION (Wikipedia): Finally, we will conclude in a Wikipedia style.

ELEMENTS DU COURS

Extra bonus ideas for visualization
whatsapp intéractif
mini game 
We also thought of some bonus elements that could improve the visualization but dropping them would not endanger the meaning of the project. For instance, we could make the Whatsapp app interactive by asking a question to the reader regarding what he would expect the result to be. The reader can then answer as he would using the real Whatsapp app.
Another thing we thought of would be to make a kind of mini-game since the gaming category represents one of the most used ones.

Functional prototype (working website)
Link to the website





## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

