

<?php
  header("Content-Type: application/json");
  // Projects
  $projects = [];

  foreach(page('home')->children()->listed() as $project):
    $images = [];
    // looping through all images
    foreach($project->images() as $image):
      array_push($images, [
        'url' => $image->url(),
        'caption' => $image->caption()->value(),
      ]);
    endforeach;


    $project = [
      'slug' => $project->slug(),
      'title' => $project->title()->value(),
      'text' => $project->text()->value(),
      'images' =>  $images,
    ];
    array_push($projects, $project);
  endforeach;

  echo json_encode($projects);
?>