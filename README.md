# Politick Twitter Express Server

Twitter Database for use with Politick

[Politick](https://ml-politick-server.herokuapp.com/)


### Table of Contents
* [Users](#-users)

## Users

* GET - All Users - ```/api/v1/users```

Hitting this endpoint will return an array of user objects

##### Example Response

```
[
{
_id: "5bf490f59bc239000449c89d",
username: "mikejoh50113529",
image: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
__v: 0
},
{
_id: "5bfc1cd8428fea000425a404",
username: "wizard_dance",
image: "https://pbs.twimg.com/profile_images/414294803031937024/JXpzqkBy_normal.jpeg",
__v: 0
}
]
```
