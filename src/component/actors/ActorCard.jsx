const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
  //   const summaryStripped = summary
  //     ? summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')
  //     : 'No Description available ';
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h1>
        {name}
        {!!gender && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No Country Known'}</p>

      {!!birthday && <p>Born {birthday}</p>}

      <p>{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </div>
  );
};

export default ActorCard;
