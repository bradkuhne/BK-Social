# BK-Social
Social Network that allows users to be added and removed, users to express thoughts, make friends, and allows for reactions to toughts.

Github repo link:  https://github.com/bradkuhne/BK-Social
Screencastify recording link:  https://drive.google.com/file/d/1AuiOUGBt6sHIgpUJV0PQ9OdfJ_yAXmU6/view

## Description
  
 BK-Social is a backend social networking application that allows users to apply Create, Read, Update and Delete actions on Users, Friends, Thoughts and Reactions to Thoughts. BK-Social does not have a front-end but it is ready for one to be built for it.  The application uses MongoDB, Mongoose and Express.js.
  
## License
  
 [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
  
 The Unlicense is a template for disclaiming copyright monopoly interest in software you've written; in other words, it is a template for dedicating your software to the public domain. It combines a copyright waiver patterned after the very successful public domain SQLite project with the no-warranty statement from the widely-used MIT/X11 license.
  
## Table of Contents
  
* [Installation](#Installation)
  
* [Usage](#Usage)
  
* [Contributions](#Contributions)
  
* [Tests](#Tests)
  
* [Questions](#Questions)
  
## Installation
  
 To install BK-Social you just need to have MongoDB, Mongoose and Express.js installed.  After that, just enter 'NPM Start'.
  
## Usage
  
 The BK-Social application should be used by someone wanting to utilize a pre-made backend for a social networking application.
  
## Contributions
  
 This project was solely developed by Brad Kuhne.
  
## Test Instructions
  
 This project was not developed with TDD.  To test it, run index.js and utilize a tool such as Insomnia to test all of the rountes and compare the rersults to expected results.
  
## Questions
  
 https://github.com/bradkuhne  Email: bjkuhne@aol.com

## Addtional Information

User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

Models
User

username

String
Unique
Required
Trimmed
email

String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)
thoughts

Array of _id values referencing the Thought model
friends

Array of _id values referencing the User model (self-reference)
Schema Settings

Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

Thought

thoughtText

String
Required
Must be between 1 and 280 characters
createdAt

Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query
username (The user that created this thought)

String
Required
reactions (These are like replies)

Array of nested documents created with the reactionSchema
Schema Settings

Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

Reaction (SCHEMA ONLY)

reactionId

Use Mongoose's ObjectId data type
Default value is set to a new ObjectId
reactionBody

String
Required
280 character maximum
username

String
Required
createdAt

Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query
Schema Settings

This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.