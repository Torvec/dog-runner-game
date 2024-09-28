# The Running Dog

A side-scrolling action game where you play as a dog with super powers. Defeat enemies and avoid getting hit while you try to get the highest score possible within the time limit.

## Credits

The original code base was created by Frank Dvorak of [Frank's Laboratory](https://www.youtube.com/@Frankslaboratory) from his lengthy tutorial on youtube [JavaScript Game Development Course for Beginners](https://www.youtube.com/watch?v=GFO_txvwK_c), specifically project 9 which is the final project in the series. That said, I have made many modifications and additions such as the following:

## Additions to Original Codebase

- Added 3 more levels + a final boss level for a total of 4 levels
- Added more enemy types/sprites with different behaviors so each level has different enemies
- Added projectiles that the player can shoot to defeat enemies along with an ammo system
- Added a power level system to control when the player can use the fire roll ability
- Added a start menu, scoreboard, credits, controls, tutorial, and game complete menu screens
- Added pause and resume functionality for each level
- Added a game over and level complete states for each level
- Added a restart level functionality
- Added a scoring system that saves each level's score in local storage as well as the final score for all levels combined
- Added sound effects for projectiles, collisions, and player abilities
- Added background music with play/pause functionality

## Assets

Most art assets were created by bevouliin at [https://bevouliin.com/](https://bevouliin.com/)
I did edit a few backgrounds to differentiate some of the levels and created the projectile sprites used by the player and the boss.

All sound related assets can be found here:
- [explosion.wav](https://opengameart.org/content/boom-pack-2)
- [fire_ball.wav](https://freesound.org/people/qubodup/sounds/442827/)
- [fire_roll.wav](https://freesound.org/people/magnuswaker/sounds/581078/)
- [hit.wav](https://opengameart.org/content/magic-sfx-sample)
- [puff.wav](https://freesound.org/people/qubodup/sounds/714257/)
- [shoot.wav](https://freesound.org/people/BaggoNotes/sounds/720118/)

All music related assets can be found here:
- [run_for_your_life_00.wav](https://freesound.org/people/LittleRobotSoundFactory/sounds/320981/)
- [run_for_your_life_01.wav](https://freesound.org/people/LittleRobotSoundFactory/sounds/320982/)
- [run_for_your_life_02.wav](https://freesound.org/people/LittleRobotSoundFactory/sounds/320983/)
- [run_for_your_life_03.wav](https://freesound.org/people/LittleRobotSoundFactory/sounds/320984/)

### Setup Assets

The art assets are not included in this repo but can be found here: [JavaScript Game Development Course for Beginners](https://www.youtube.com/watch?v=GFO_txvwK_c)
The ones not in the descritpion are listed as follows:
- [explosion.png](https://opengameart.org/content/explosion) NOTE: I modified this sprite to be completely horizontal to get the animation to work
- fireball.png and fireball_big.png were created by me
- Also the backgrounds with the _alt and/or _flip suffixes were the ones modified by me

1. Open the description and look for Project 9: Final Endless Runner Game.
2. Download the assets from the links provided in the description. NOTE: I did not use all of the enemy sprites listed in the description.
3. Create the following directory structure in the root of the project and place the assets in the appropriate directories as shown below:

```
/assets
  /backgrounds
    /city
      layer-1_alt_flip.png
      layer-1_alt.png
      layer-1.png
      layer-2.png
      layer-2_alt.png
      layer-3.png
      layer-4.png
      layer-5_alt.png
      layer-5.png
    /forest
      layer-1_alt.png
      layer-1.png
      layer-2.png
      layer-3.png
      layer-4.png
      layer-5.png
  /music
    run_for_your_life_00.wav
    run_for_your_life_01.wav
    run_for_your_life_02.wav
    run_for_your_life_03.wav
  /sounds
    explosion.wav
    fire_ball.wav
    fire_roll.wav
    hit.wav
    puff.wav
    shoot.wav
  /sprites
    /enemy
      enemy_bat_3.png
      enemy_fly.png
      enemy_ghost_2.png
      enemy_ghost_3.png
      enemy_ghost_4.png
      enemy_ground_zombie.png
      enemy_plant.png
      enemy_raven.png
      enemy_spider_big.png
      enemy_spider.png
      enemy_spinner.png
      enemy_worm.png
      enemy_zombie.png
    /particles
      boom.png
      explosion.png
      fire.png
      fireball_big.png
      fireball.png
    /player
      player.png
    /ui
      heart.png
      lives.png
  
```
