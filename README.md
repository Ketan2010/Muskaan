# Muskaan
A lending hand.

## Todo's
| **Task** | **Assigned to** | **Due** | **Status** |
| :--- | :--- | :--- | :---: |
| Authentication - Landing page | Darshan | 17-6 | <li>[x] Done</li> |
| Authentication - signup page | Darshan | 17-6 | <li>[x] Done</li> |
| Authentication - login page | Darshan | 17-6 | <li>[x] Done</li> |
| Authentication - firebase+alternate logins(google, facebook etc.) | Ketan | 17-6 | <li>[x] Done</li> |
| Authentication - ForgotPassword | Ketan | 17-6 | <li>[x] Done</li> |
| Authentication - integration+testing | Darshan, Ketan | 17-6 | <li>[x] Done</li> |
| Side Drawer Navigation | Darshan | 17-6 | <li>[x] Done</li> |
| Setting Page UI | Darshan | 17-6 | <li>[x] Done</li> |
| User Profile + Update Profile | Ketan | 21-6 | <li>[x] Done</li> |
| Upgrade User | Ketan | 23-6 | <li>[x] Done</li> |
| Notification and History UI | Ketan | 25-6 | <li>[x] Done</li> |
| FAQ UI | Ketan | 25-6 | <li>[x] Done</li> |
| Tab Navigator | Darshan | (On Hold) | <li>[ ] Done</li> |
| Donation Module UI | Darshan | 28-6 | <li>[x] Done</li> |
| Donation Module Firebase| Ketan | 28-6 | <li>[x] Done</li> |
| Receive Module UI | Ketan | 30-6 | <li>[x] Done</li> |
| Receive Module Firebase | Darshan | 2-7 | <li>[x] Done</li> |
| History (Donation) Firebase | Ketan | 5-7 | <li>[x] Done</li> |
| Karma Points UI | Ketan | 24-7 | <li>[x] Done</li> |
| Testing and Bug Fix | Darshan Ketan | 14-8 | <li>[x] Done</li> |
| Notification page | Ketan | 1-9 | <li>[x] Done</li> |
| Feedback page | Darshan | 6-9 | <li>[ ] Done</li> |
| Push Notifications | xxx | yyy | <li>[ ] Done</li> |
| Settings page functionality | xxx | yyy | <li>[ ] Done</li> |
| FAQ Page | xxx | yyy | <li>[ ] Done</li> |



## Bug Fixing
| **Bug** | **Assigned to** | **Fixed** |
| :--- | :--- | :---: |
| 1. Show msg on map if no donations | Darshan | <li>[x] Fixed</li> |
| 2. Header Hight | Ketan | <li>[x] Fixed</li> |
| 3. Navigate default to homepage after login | Ketan, Darshan | <li>[x] Fixed</li> |
| 4. Profile page icons and responsiveness | Darshan | <li>[x] Fixed</li> |
| 5. Pending donations: no of remaining plates | Darshan | <li>[x] Fixed</li> |
| 6. Plates-- after successful donation | Darshan | <li>[x] Fixed</li> |
| 7. Receive need refresh | Ketan | <li>[x] Fixed</li> |
| 8. Dont show outdated donations on map | Darshan | <li>[x] Fixed</li> |
| 9. On cancle request: Other request is deleted (refresh needed to reflect change) | Darshan | <li>[x] Fixed</li> |
| 10. Same same cards of request (Need to get back in another page) | Ketan | <li>[x] Fixed</li> |
| 11. on receive page:same same tiles | Darshan | <li>[x] Fixed</li> |
| 12. Validate donation time | Darshan | <li>[x] Fixed</li> |
| 13. Dynamic hight of card | Darshan | <li>[x] Fixed</li> |
| 14. Dont show 0 plates donation | Darshan | <li>[x] Fixed</li> |




## Contribution Guide
(Step 1 and 2 will need only once)
1. initialise git repository in your project directory if not already 

```
 git init 
```
2. Add remote repository as origin (In short link remote repository with local one)

```
 git remote add origin 'git@github.com:Ketan2010/Muskaan.git'
```
(Following steps will required everytime for commiting) <br>
3. Pull everything from remote repository to local one to maintain integrity.(code in remote repository will automatically merger with code of local repository)
```
 git pull origin main
```
{u start project using expo start and if u got error stating that expo sdk not found then run: npm install expo} <br>
4. Rename your master brance with main (this will required only once)
```
 git branch -m master main
```
5. Add local repository files into staging area
```
 git add .
```
6. commit your changes
```
 git commit -m "your commit message"
```
7. push all changes to remote repository
```
 git push origin main
```




