<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Setup</title>
  <style>
    img {
      max-width: 200px;
      max-height: 200px;
      width: auto;
      height: auto;
      vertical-align: middle;
    }
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    figure {
      margin: 0;
      padding: 0;
    }
    figcaption {
      text-align: center;
      font-size: 0.8rem;
      letter-spacing: 0.03em;
      margin-top: 5px;
    }
    figcaption p {
      margin-top: 0;
    }
    p {
      max-width: 100ch;
    }
  </style>
</head>
<body>
<h1><?= $page->title() ?></h1>
<hr>
<?php foreach($page->children()->listed() as $project): ?>
  <section>
    <h2><?= $project->title() ?></h2>
    <div>
      <?= $project->text()->kt() ?>
    </div>
    <div class="gallery">
      <?php foreach($project->images() as $image): ?>
        <figure>
          <img
            src="<?= $image->resize(200)->url() ?>"
            alt="<?= $project->title() ?>"
            width="<?= $image->width() ?>"
            height="<?= $image->height() ?>"
          >
          <?php if($image->caption()->isNotEmpty()): ?>
            <figcaption>
              <?= $image->caption()->kt() ?>
            </figcaption>
            <?php endif ?>
        </figure>
        <?php endforeach ?>
    </div>
    <hr>
  </section>
<?php endforeach ?>

</body>
</html>