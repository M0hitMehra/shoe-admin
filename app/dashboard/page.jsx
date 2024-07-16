"use client";

import Loader from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function renderData(data) {
  return data ? data : "-";
}

const Dashboard = () => {
  const router = useRouter();

  const { user, loading, error, fetchUser, userFetched } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading && !user && userFetched) {
      router.push("/login");
    }
  }, [loading, user, userFetched, router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="  grid grid-cols-1 lg:grid-cols-6 gap-4 h-[90vh] ">
      <div className="lg:col-span-2 h-[90vh] flex flex-col justify-center items-center">
        <div className="rounded-t-md h-96 w-full overflow-hidden shadow-md">
          <Image
            src={user?.avatar?.url}
            alt="User image"
            width={384} // Provide width as required
            height={384} // Provide height as required
            className="w-full h-full object-cover duration-1000 hover:scale-125"
          />
        </div>
        <div className="animated-gradient shadow-lg rounded-b-md w-full h-full lg:p-5 p-2 flex flex-col gap-5">
          <div className=" grid grid-cols-2 justify-between items-center">
            <h3 className=" col-span-1  break-all  font-medium text-lg text-yellow-100">
              First Name
            </h3>
            <span className=" col-span-1  break-all  flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.firstName)}
            </span>
          </div>

          <div className="grid grid-cols-2   justify-between items-center">
            <h3 className=" col-span-1  break-all  font-medium text-lg text-neutral-50">
              Last Name
            </h3>
            <span className=" col-span-1  break-all  flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.lastName)}
            </span>
          </div>

          <div className=" grid grid-cols-2  justify-between items-center">
            <h3 className="col-span-1 break-all font-medium text-lg text-neutral-50">
              Email
            </h3>
            <span className=" col-span-1 break-all  flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.email)}
            </span>
          </div>

          <div className=" grid grid-cols-2  justify-between items-center">
            <h3 className=" col-span-1 break-all font-medium text-lg text-neutral-50">
              Role
            </h3>
            <span className=" col-span-1 break-all flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.role)}
            </span>
          </div>

          <div className="  grid grid-cols-2  justify-between items-center">
            <h3 className=" col-span-1 break-all font-medium text-lg text-neutral-50">
              Phone
            </h3>
            <span className=" col-span-1 break-all flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.phone)}
            </span>
          </div>

          <div className="  grid grid-cols-2  justify-between items-center">
            <h3 className="  col-span-1 break-all font-medium text-lg text-neutral-50">
              D.O.B
            </h3>
            <span className=" col-span-1 break-all flex justify-end font-normal text-lg text-neutral-50">
              {renderData(user?.dob)}
            </span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 bg-neutral-50 h-[90vh] rounded-md lg:p-6 p-1 shadow-lg grid grid-rows-4">
        <div className="p-4 flex flex-col gap-4 row-span-2 w-full ">
          <h1 className=" font-bold text-lg">Login History</h1>
          <Separator />
          <p className=" overflow-y-auto ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati,
            commodi consectetur. Error illo consequuntur, corporis consectetur,
            quam delectus ipsum sapiente praesentium recusandae modi similique
            porro pariatur deleniti expedita quaerat assumenda, nostrum optio
            aliquid odio odit mollitia architecto ex voluptatibus adipisci?
            Facere incidunt quisquam ullam voluptates consectetur hic atque,
            illum laudantium est asperiores deserunt assumenda. Enim beatae
            similique placeat possimus repellendus ea, debitis veritatis. Quos,
            at aut! Doloribus, non at. Pariatur quia quaerat perspiciatis sed
            neque. Mollitia nulla dignissimos repudiandae, neque veritatis
            similique temporibus maiores rerum recusandae delectus ipsam
            cupiditate ut laudantium quasi dolorum magnam sint porro, suscipit
            incidunt nam esse nostrum blanditiis! Accusantium autem dolorum
            inventore esse sint, laudantium quibusdam maxime sit consectetur vel
            ratione explicabo ducimus, soluta, atque illo impedit nisi porro
            fuga minus numquam reprehenderit in alias? Libero eos, et corrupti
            sit autem, architecto rerum iure est laborum natus, saepe quos
            minima. At magnam iure, praesentium eum sequi temporibus, dolore
            possimus exercitationem dignissimos, libero natus assumenda rem et
            harum facilis tempore ipsam dolorum repellendus. Quos laboriosam
            cumque totam aspernatur ducimus earum, dolorum quis quas reiciendis.
            Nemo modi perferendis id repellendus aut, ipsa dolorem doloremque.
            Nostrum quidem nihil tempora est eveniet explicabo sed repellendus
            molestias ut, reiciendis obcaecati facere, aut, dolore possimus
            suscipit maxime animi. Tempora, ex voluptates. Magnam eius atque
            laborum? Provident magni exercitationem ex mollitia quaerat numquam
            dolorem, soluta tenetur porro corrupti, aliquam culpa ipsa
            voluptatum, accusamus commodi deleniti molestiae obcaecati
            repudiandae maiores. Autem saepe dignissimos provident natus placeat
            velit eum perferendis maxime consequatur fuga architecto quia nobis
            exercitationem, ex quo necessitatibus harum, asperiores sed in eius
            voluptatem repellat, perspiciatis ullam? Expedita quam perferendis
            possimus veniam quo, odit dolorem nihil voluptatem obcaecati
            delectus porro, dolore blanditiis iste esse alias deserunt, incidunt
            illum officia recusandae! Ea nesciunt possimus esse cumque dicta
            minima maxime eius. Earum, quos incidunt. In eligendi sapiente
            delectus vel ipsam exercitationem laborum harum. Numquam accusantium
            esse voluptas architecto impedit repellendus illo nesciunt natus.
            Assumenda tempora quaerat nam. Officiis quam iste sunt, vero natus
            asperiores inventore consequuntur minus dolorem perspiciatis facere
            aspernatur sint dolor assumenda necessitatibus reiciendis ad
            nesciunt delectus amet deserunt! Quis assumenda eveniet fuga
            doloribus, corporis magnam modi culpa illo saepe cumque tempore quos
            aut? Tempora provident earum reiciendis minus mollitia quaerat quo
            nulla adipisci voluptatibus dignissimos! Natus, blanditiis ullam.
            Eligendi expedita, alias fugiat incidunt veritatis perspiciatis
            repudiandae consequuntur cumque et ea animi fugit eos ipsa harum
            reiciendis natus cum. Voluptatum veniam impedit, fuga cumque ratione
            hic vitae inventore, perspiciatis vero similique nobis veritatis
            blanditiis eveniet. Doloremque similique officia alias molestias
            architecto, incidunt aspernatur sunt itaque facilis ea quos ipsum
            non molestiae cum praesentium aliquid culpa. Necessitatibus nesciunt
            quis laudantium commodi provident placeat? Excepturi nisi quisquam
            voluptate, ea rem sequi id perspiciatis qui alias non, sed culpa,
            quae incidunt ipsa! Ex laboriosam at saepe atque nihil distinctio
            eaque! Ea ab blanditiis odio sequi. Hic esse ad reiciendis
            necessitatibus? Iusto animi dolor sed. Voluptatem possimus
            blanditiis recusandae molestiae assumenda. Voluptatum dolorum sunt
            ea ad odio reprehenderit dignissimos numquam eaque expedita incidunt
            eveniet, architecto accusantium non, laudantium hic ipsam ipsum
            pariatur atque. Repudiandae expedita esse assumenda ipsa non
            dolorem, dolore suscipit quibusdam delectus error voluptate corporis
            nobis adipisci, quaerat mollitia accusamus, optio consectetur. Quam
            pariatur tenetur impedit, non in facere ea reiciendis, corporis ex
            consectetur earum sequi debitis quo vel consequatur placeat, ratione
            quia mollitia molestias ducimus quisquam explicabo exercitationem
            quos. Ipsam unde sunt veritatis praesentium eos fuga repellat illum
            libero voluptatibus rem animi obcaecati aspernatur reprehenderit
            temporibus asperiores, pariatur eveniet eius, doloremque consequatur
            placeat autem repudiandae. Non omnis repellendus a est, veritatis
            cumque exercitationem cupiditate dolores illum in molestias quas cum
            expedita ut laudantium sapiente. Error, officia quaerat reiciendis
            ullam similique minus facilis? Nam amet reprehenderit cum quibusdam
            repellendus eum aliquam reiciendis vel unde dolor? Sed sequi ab
            officiis repellendus a suscipit nemo architecto, possimus debitis
            eos qui deserunt sint pariatur explicabo tempore reiciendis modi
            earum tempora velit. Ducimus ex incidunt sapiente a, repellat vel
            corporis nemo tempora at saepe illum quae corrupti cumque suscipit
            necessitatibus distinctio laborum odit autem debitis alias fugit
            itaque. Dolore hic, voluptatibus explicabo, dicta vitae deserunt
            magni laborum, accusantium excepturi consectetur optio impedit
            pariatur commodi praesentium iusto quo perferendis! Omnis voluptatem
            maiores nihil quam amet minus alias, cum consequuntur nobis
            laudantium? Aliquam, tempora neque quasi unde sapiente cum nobis
            repellendus laborum vitae dolore aperiam obcaecati rem laudantium.
            Porro consequuntur deserunt, fuga doloribus necessitatibus
            dignissimos autem, dicta cupiditate sequi rem distinctio excepturi
            illo nesciunt velit earum reprehenderit tempora exercitationem
            accusantium minus fugiat numquam animi! Officia beatae eaque
            officiis, eveniet odio rerum ipsam at delectus consectetur a
            inventore praesentium accusantium, tempora voluptas quas eos
            perspiciatis dicta. Doloribus, ut suscipit eum in nesciunt id dicta
            eos eveniet reiciendis neque non obcaecati? Veritatis, assumenda,
            consequuntur recusandae aliquid autem eveniet distinctio asperiores
            temporibus fuga laudantium voluptatum, quisquam obcaecati ratione
            sapiente sequi amet magnam omnis rerum velit ipsam? Reiciendis
            maxime molestias quasi numquam voluptatibus et voluptatem, hic eius
            quo dignissimos, sunt beatae voluptatum, similique totam? Unde minus
            tempora quidem. Sit placeat exercitationem molestias doloremque
            inventore ipsam tempore dolorum, obcaecati iusto alias quisquam sint
            animi unde, laborum necessitatibus temporibus ab! Cum, fuga
            recusandae cumque asperiores ut iusto magni atque dolor temporibus
            exercitationem similique voluptate pariatur adipisci iste aliquid
            iure repellendus soluta, saepe tempore sint blanditiis consequuntur
            illo commodi maxime! Neque fuga quidem atque repellat reiciendis aut
            unde odit. Eaque fuga recusandae eum sapiente quaerat nihil nam
            numquam ratione quisquam adipisci optio maiores esse error vitae,
            autem quos commodi tempora! Maiores sunt earum, laborum dicta iure
            iste nemo quae adipisci mollitia nihil? Totam illo unde inventore
            repudiandae! Reiciendis blanditiis aspernatur asperiores. Quibusdam
            error vitae repudiandae sint quaerat, quisquam voluptate praesentium
            minus quasi. Incidunt beatae, nemo dicta consectetur recusandae
            corporis hic eum! Officia, ex quidem in itaque quia ipsa vel magnam
            alias tenetur odit nesciunt autem suscipit cupiditate pariatur
            voluptatum omnis reiciendis exercitationem, nobis voluptas ad iste.
            Officiis delectus veniam facere sed eaque consequuntur nihil, animi
            amet exercitationem atque reiciendis nemo ipsam error cum, eveniet
            dolorem numquam, veritatis minus enim! Dolorum, ducimus odio
            deserunt ullam incidunt omnis, optio non accusamus facilis iure
            nisi, consequuntur eius ut animi assumenda? Minima totam consequatur
            aliquid velit consequuntur est esse optio ipsum iste asperiores,
            facere quibusdam vero laborum laudantium repudiandae fuga modi saepe
            officia nisi exercitationem! Veniam, ea amet ipsam, delectus, ipsa
            similique corporis veritatis fugit sint ipsum natus illum mollitia
            nesciunt voluptate animi magni perferendis beatae molestiae aliquid
            esse praesentium autem minima provident. Ea nisi illo recusandae
            harum saepe adipisci? Adipisci natus, nemo fugiat et temporibus
            deleniti perferendis suscipit unde saepe maxime hic maiores
            asperiores consequuntur inventore amet ad ratione magni. Molestiae
            maiores optio commodi, enim cumque labore vero quasi. Error iusto,
            animi numquam reiciendis ab aperiam. Asperiores earum repellendus
            maxime minus ipsa culpa cum dolorem. Adipisci ullam nobis amet
            magnam cupiditate facilis ea ab, quis dolore hic reiciendis, rerum
            asperiores illo ipsam commodi iusto debitis nesciunt sapiente veniam
            doloremque! Deleniti eligendi officiis praesentium ullam non
            voluptatum excepturi ab veritatis id quis, modi eaque nihil quod
            obcaecati quos sapiente voluptates adipisci iste est minima
            consequuntur inventore ipsum quia. Quisquam suscipit magnam harum
            vel natus in cupiditate enim officia, nulla ipsam, fuga excepturi!
            Amet repudiandae possimus deleniti culpa. Delectus fuga alias et qui
            in impedit recusandae fugiat, consequatur tenetur neque libero
            ratione nulla quos voluptatum nisi architecto commodi saepe mollitia
            eos cum quam labore officia sapiente dolorum. Quas, blanditiis! Quas
            adipisci, laudantium perspiciatis eligendi eum error iure
            consequatur. Eligendi, illo? Perferendis, eveniet modi odio vel sint
            enim ducimus id quas officia voluptatibus veniam illo tempora
            tenetur inventore. Quaerat quas dicta numquam reprehenderit
            provident quisquam quod aut ipsam tenetur ab, aperiam tempore. Ex ad
            nostrum quos optio? Quos aut qui laborum at culpa, tempore cumque ea
            commodi incidunt veniam voluptas architecto? Odio veritatis aut
            aspernatur! Assumenda, minus aut debitis voluptatibus rem esse
            laudantium sapiente adipisci! Aperiam, ut ratione. Hic ad fuga
            minima maiores nobis molestiae culpa nesciunt ipsam provident
            voluptates rem, optio quo consequuntur quasi quidem rerum sed unde
            error minus praesentium distinctio. Debitis, eaque iste blanditiis
            temporibus totam adipisci quaerat unde non eligendi dolores enim
            exercitationem. Quia amet neque iusto architecto sequi saepe animi
            accusantium, excepturi eos nulla perferendis. Obcaecati aliquid odio
            saepe nulla ex nihil explicabo! Explicabo sit debitis cupiditate
            iure culpa, repellat, sunt autem rerum corrupti labore repudiandae
            qui ratione expedita reiciendis iusto molestiae inventore adipisci,
            commodi ipsum harum repellendus distinctio voluptatum accusantium
            assumenda. Pariatur incidunt perferendis corporis inventore laborum,
            voluptatibus saepe sed quis exercitationem, optio necessitatibus
            illo excepturi, soluta recusandae a molestiae tempore ducimus
            voluptates reiciendis dolor magni amet. Cupiditate cumque nemo natus
            magni repellendus magnam ab hic aperiam aliquid illum molestiae
            maxime itaque nulla at voluptas odio, fuga dignissimos debitis
            facere eius sit recusandae! Ut, impedit exercitationem porro iste
            temporibus, minus dolore labore, voluptate dolorum accusantium amet
            repellendus! Voluptatum officia dolorum veniam ea facere, error quod
            fugiat eius deserunt veritatis quae voluptate excepturi ad
            aspernatur perferendis illo molestiae numquam nisi dicta et tempora
            ab dolor dignissimos placeat! Dolores quisquam vero distinctio
            officia suscipit non provident impedit culpa commodi, voluptatum
            laudantium nesciunt deserunt! Commodi reprehenderit expedita libero
            saepe aliquam modi inventore veritatis earum asperiores ipsa non,
            eius, consequuntur quis porro? Quos placeat voluptatibus suscipit
            nisi quasi accusantium provident laboriosam eos consectetur dolorem.
            Aliquid sint libero perferendis tempora? Voluptatum debitis in totam
            eveniet officiis, voluptatem doloribus dignissimos quidem eligendi
            unde impedit excepturi voluptas sint perferendis accusantium harum
            laborum aperiam voluptates nesciunt eos tenetur deleniti eius!
            Suscipit tempore delectus recusandae ab nihil excepturi, consequatur
            dolorem fuga assumenda quos. Amet quidem vitae ab quasi
            reprehenderit reiciendis id placeat quas odit aliquam nobis,
            aliquid, adipisci rem ipsum illo asperiores rerum est inventore
            officia impedit sapiente vel quo. Laboriosam nemo ipsam ad tempore
            repudiandae vero quod omnis maiores rerum adipisci sunt dignissimos
            qui, quis magnam dicta officia, ea suscipit alias sequi enim. Enim
            fugiat quod reiciendis praesentium pariatur, neque molestias cum
            ullam, quam voluptatibus aspernatur provident, perferendis
            blanditiis recusandae totam alias vero id laborum tenetur inventore.
            Necessitatibus voluptatem dolorum at vero sed. Numquam nostrum a
            aperiam architecto et ab sit doloremque assumenda fugiat corrupti
            quam itaque incidunt veniam vitae, dicta veritatis ea tenetur odio
            dolores rem esse quia maiores eaque voluptatibus? Distinctio
            perferendis quia quo inventore. Distinctio laboriosam minus officia,
            impedit accusantium possimus voluptas vero quisquam architecto,
            delectus quos nam placeat, asperiores adipisci magni. Dicta
            asperiores dolore libero distinctio explicabo assumenda.
            Exercitationem repellat fuga placeat. Iusto hic, aliquam maxime quas
            inventore unde nisi expedita necessitatibus possimus minima vel ex,
            quae impedit eaque quia ut perferendis at alias delectus neque illum
            voluptatem? Animi quo nesciunt tenetur nulla cum beatae? Alias
            veritatis quidem in, ex voluptatibus laboriosam rem corrupti
            eligendi maxime nulla ipsum dolor dicta magnam sunt voluptate eaque,
            vero consequuntur reprehenderit, vitae molestias! Nulla laboriosam
            ipsum voluptatibus doloribus, nobis maxime fugiat inventore
            reprehenderit quisquam impedit doloremque, nostrum obcaecati quod?
            Adipisci enim voluptatum recusandae, accusantium laboriosam dolor
            reiciendis odit placeat dolore, numquam praesentium, assumenda ad
            rem accusamus voluptate possimus veniam eum maxime! Quisquam quod
            sapiente necessitatibus odio beatae ad aspernatur pariatur quam
            ratione id nesciunt recusandae libero, saepe voluptates voluptate
            veniam omnis voluptatem molestias impedit consectetur asperiores.
            Vitae laboriosam quam itaque eum? Odio praesentium alias similique
            quos assumenda provident quisquam laborum neque consectetur.
            Exercitationem magnam placeat accusamus eligendi minus ratione
            molestias qui! Doloribus quibusdam qui impedit saepe quia facilis
            illum ipsum. Quos ex repellendus iusto mollitia doloremque ad aut
            optio obcaecati laboriosam adipisci. Harum labore quod ducimus,
            doloribus optio error nisi id modi! Sit itaque nam dolor libero
            cupiditate earum ipsa recusandae esse, molestias reprehenderit fuga,
            sequi animi voluptates quas beatae rerum sed quis autem, quibusdam
            amet quod. Itaque nostrum iure atque, repellendus laborum incidunt
            animi! Optio praesentium distinctio adipisci consequuntur veritatis
            ullam neque non quis. Earum consectetur nisi recusandae beatae alias
            eos explicabo libero a culpa ea totam iure, quasi molestiae,
            incidunt quod natus. Sapiente cumque voluptas dicta dignissimos,
            adipisci aspernatur ipsa ducimus quidem, odio molestiae nostrum qui
            consectetur fuga optio! Veniam ratione quaerat ex quis atque
            dolorem, aut, reprehenderit vitae iure sed quod harum quo ducimus at
            excepturi, nesciunt inventore facilis. Aliquam distinctio est libero
            alias. Pariatur et animi minima hic, porro ab totam necessitatibus
            error possimus architecto nobis placeat cumque? Impedit perferendis
            eligendi fugit quam. Non porro animi recusandae tenetur dolor vitae
            accusantium nam quis vero, quam deserunt pariatur, possimus, nostrum
            a ex. Hic excepturi facilis nulla iure, voluptate voluptates quam
            obcaecati accusamus consequuntur non? Sapiente, est voluptatum
            quidem quaerat animi explicabo quia? Dolores repudiandae placeat
            modi aliquid nesciunt minus necessitatibus consequatur! Doloribus
            libero perferendis accusamus quis placeat veritatis odio corrupti
            dignissimos, esse minima a, ipsam reiciendis. Ipsam saepe et quasi
            iure nulla mollitia quaerat dicta eum dolore perferendis repellendus
            doloribus magni obcaecati, optio nam hic laborum blanditiis autem
            consequuntur, possimus, maxime enim velit magnam? Maxime itaque
            praesentium doloremque eaque sit accusantium rem magnam, odit
            ducimus sunt fuga repudiandae aut illum laborum officiis aliquam
            nulla esse provident ab ea sequi? Magni ex quam, aperiam facere,
            iure, sunt illo non modi ab delectus ipsam a ea rem aspernatur
            nesciunt aliquam libero? Laudantium, quam itaque corrupti
            necessitatibus vel sunt aperiam sint ducimus atque officia non odio
            asperiores ullam labore excepturi suscipit doloremque explicabo!
            Officiis distinctio saepe quasi, ipsa ratione quae labore expedita
            animi nostrum optio illo tempore culpa alias iure excepturi harum?
            Porro placeat iure doloribus soluta quas provident. Animi nisi ipsa
            voluptatem corrupti aspernatur ullam vero neque quas quaerat, illum
            incidunt dolorum quae, praesentium aliquid iure accusamus mollitia
            expedita, quisquam tempora dignissimos corporis. Quos, debitis
            reprehenderit laborum ullam eum qui, amet, nemo dolorem voluptas rem
            sed unde sit consequuntur. Ad, nesciunt alias. Voluptates in eum
            tempora! Sunt labore fuga accusamus, eum, eius aspernatur incidunt
            ut explicabo, consequuntur vel at repellat autem. Fugit asperiores
            labore provident quidem magni iste repellat consequuntur debitis
            corporis consectetur magnam iure, quaerat libero itaque atque
            voluptates deserunt eligendi quis sapiente cumque. Molestiae culpa
            assumenda corrupti ullam quod qui mollitia maiores. Dicta ullam
            molestias fugit excepturi aliquid nihil laborum minima. Fugiat
            nesciunt est aliquid illum nulla aliquam. Aliquam amet earum
            similique possimus sit debitis nobis vel inventore dicta architecto
            illo laboriosam doloribus, temporibus laudantium, laborum aut
            perspiciatis! Explicabo ex temporibus cum, minima est aut ea laborum
            deleniti doloremque expedita esse adipisci ducimus quasi, ullam
            optio non perferendis nisi voluptatem pariatur repudiandae.
            Voluptatibus temporibus dignissimos ut quos, quae quasi error
            facilis sit officia nulla ducimus, repudiandae, dolores vero ratione
            quod facere perferendis. Consequuntur, magnam ratione quis a minima
            saepe doloremque quae unde expedita distinctio excepturi
            exercitationem ipsam possimus pariatur provident magni sunt ab
            voluptas laudantium. Perspiciatis, delectus sed, in, aliquid unde
            quia laborum animi nemo praesentium eaque ex distinctio! Laboriosam
            quam velit qui ad soluta nulla vero, quibusdam quidem neque ullam
            voluptas sequi deleniti dolorum molestiae corporis tempore ex,
            aliquid in quos tempora, dolorem eligendi obcaecati repudiandae cum.
            Nemo distinctio exercitationem non pariatur, esse quo! Eos voluptate
            nesciunt voluptas excepturi amet, esse odio iste vitae tenetur odit
            illum molestiae perferendis necessitatibus, accusantium accusamus!
            Delectus, reiciendis eligendi vel a ipsa deleniti nobis modi tenetur
            praesentium temporibus omnis consectetur quo ducimus voluptates sunt
            voluptas et! In, quo perspiciatis ad aperiam nostrum quibusdam
            quidem labore aliquam cum quae. Repellendus consectetur esse eaque
            veritatis facere recusandae tempora quas, fuga totam eligendi
            nesciunt, delectus quos at libero exercitationem animi dicta? Odit,
            distinctio nobis placeat rerum consequuntur laudantium, amet
            voluptas eum maiores quibusdam impedit dolorem veniam nulla harum
            facilis cumque ut dicta at. Illo eveniet assumenda asperiores
            aspernatur nemo suscipit ipsum, omnis inventore neque totam autem
            itaque amet! Voluptatem laborum quos consequatur, porro possimus
            doloremque nisi iure quisquam veritatis, at nostrum impedit
            inventore, alias reprehenderit. Ullam commodi, quos facilis
            distinctio cupiditate, quam quaerat praesentium perferendis id
            soluta, laborum iure eaque corrupti quas labore molestias. Numquam
            ab reprehenderit saepe. Itaque error temporibus quas distinctio
            magni quae laborum facere repellendus reiciendis, sed numquam ipsa
            cumque! Minus optio labore possimus incidunt! Unde eius placeat,
            inventore quia animi blanditiis sint ducimus voluptatibus quaerat?
            Laboriosam, est minima tempora in molestiae architecto nam iste aut
            dolor quas! Voluptatibus voluptatem veniam deleniti a commodi enim
            totam cum, similique vero praesentium eum est aliquid quod molestiae
            voluptas ratione ducimus velit magnam. Modi culpa, molestiae maxime
            tempore odit nulla similique! Natus facilis voluptatibus harum
            sapiente deserunt vero saepe? Ipsum soluta repudiandae nobis
            doloribus aut sunt beatae optio maiores eaque consequuntur. Dolor
            ipsam eaque, doloremque dicta ipsum sit deleniti alias hic magnam,
            recusandae repudiandae non sunt ullam asperiores ad quod reiciendis
            culpa. Deleniti alias eum harum hic dicta necessitatibus voluptate
            aliquid odit ex ut accusantium eaque fugiat laborum, doloribus rem?
            Quam eaque minima unde, labore accusantium accusamus ut provident
            nemo quis ea odit excepturi veritatis expedita magnam ipsam facere
            aspernatur in, dicta odio. Earum odio mollitia voluptates eius alias
            repellat quae nemo, perspiciatis dolorum vero dolor! Dolore possimus
            veniam odit inventore neque! Fuga corporis eaque officiis neque ab
            cum nobis dicta dolorem. Saepe, mollitia, commodi fugit quae eius
            aut nesciunt magni cumque vero explicabo ullam natus voluptatem.
            Voluptate, doloribus exercitationem modi eius minus pariatur optio
            odio itaque excepturi asperiores dolores inventore nemo quasi
            possimus, voluptatum rerum soluta laudantium? Minima, deserunt amet
            temporibus culpa cum quaerat nesciunt! Accusantium illo harum
            accusamus obcaecati eius eaque cumque odit voluptas libero nisi ad
            dicta deserunt, ullam sequi, hic dolorem eligendi eos vel.
            Asperiores, perspiciatis nesciunt! Accusantium illum labore ea
            officiis magni alias ducimus esse consequatur consectetur! Excepturi
            nostrum minus beatae ipsam, error animi, autem nam iste sed
            assumenda nobis ut nisi enim praesentium, recusandae aperiam? Sunt
            unde deleniti ipsam fugiat corporis nesciunt enim temporibus
            sapiente iure. Et nostrum ratione praesentium ut quam magni ipsum
            excepturi quod quia ducimus, libero esse consequuntur deleniti
            pariatur sapiente voluptates omnis repudiandae nobis cumque minima
            voluptatem error adipisci. Dolorem mollitia exercitationem doloribus
            quam quasi obcaecati reprehenderit impedit, veritatis praesentium.
            Fugiat expedita, repellendus perspiciatis, accusamus dolorum vero
            laudantium hic possimus itaque saepe error neque excepturi qui
            officiis, sit pariatur perferendis labore. Id libero at molestiae
            itaque omnis quisquam inventore incidunt beatae. Nihil veritatis,
            earum beatae nesciunt in consequatur nam, tempora repellendus ut
            perferendis, iusto perspiciatis veniam soluta facere dolore dolorum
            magni. Molestiae cum facere blanditiis dicta excepturi possimus,
            voluptatum obcaecati dolor saepe, tempora ad. Error asperiores culpa
            voluptatum. Recusandae eaque itaque tempora repellendus cum tempore
            dolorem, facilis atque repudiandae!
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4 row-span-2 w-full  ">
          <h1 className=" font-bold text-lg">Recently Visited</h1>
          <Separator />
          <p className=" overflow-y-auto ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati,
            commodi consectetur. Error illo consequuntur, corporis consectetur,
            quam delectus ipsum sapiente praesentium recusandae modi similique
            porro pariatur deleniti expedita quaerat assumenda, nostrum optio
            aliquid odio odit mollitia architecto ex voluptatibus adipisci?
            Facere incidunt quisquam ullam voluptates consectetur hic atque,
            illum laudantium est asperiores deserunt assumenda. Enim beatae
            similique placeat possimus repellendus ea, debitis veritatis. Quos,
            at aut! Doloribus, non at. Pariatur quia quaerat perspiciatis sed
            neque. Mollitia nulla dignissimos repudiandae, neque veritatis
            similique temporibus maiores rerum recusandae delectus ipsam
            cupiditate ut laudantium quasi dolorum magnam sint porro, suscipit
            incidunt nam esse nostrum blanditiis! Accusantium autem dolorum
            inventore esse sint, laudantium quibusdam maxime sit consectetur vel
            ratione explicabo ducimus, soluta, atque illo impedit nisi porro
            fuga minus numquam reprehenderit in alias? Libero eos, et corrupti
            sit autem, architecto rerum iure est laborum natus, saepe quos
            minima. At magnam iure, praesentium eum sequi temporibus, dolore
            possimus exercitationem dignissimos, libero natus assumenda rem et
            harum facilis tempore ipsam dolorum repellendus. Quos laboriosam
            cumque totam aspernatur ducimus earum, dolorum quis quas reiciendis.
            Nemo modi perferendis id repellendus aut, ipsa dolorem doloremque.
            Nostrum quidem nihil tempora est eveniet explicabo sed repellendus
            molestias ut, reiciendis obcaecati facere, aut, dolore possimus
            suscipit maxime animi. Tempora, ex voluptates. Magnam eius atque
            laborum? Provident magni exercitationem ex mollitia quaerat numquam
            dolorem, soluta tenetur porro corrupti, aliquam culpa ipsa
            voluptatum, accusamus commodi deleniti molestiae obcaecati
            repudiandae maiores. Autem saepe dignissimos provident natus placeat
            velit eum perferendis maxime consequatur fuga architecto quia nobis
            exercitationem, ex quo necessitatibus harum, asperiores sed in eius
            voluptatem repellat, perspiciatis ullam? Expedita quam perferendis
            possimus veniam quo, odit dolorem nihil voluptatem obcaecati
            delectus porro, dolore blanditiis iste esse alias deserunt, incidunt
            illum officia recusandae! Ea nesciunt possimus esse cumque dicta
            minima maxime eius. Earum, quos incidunt. In eligendi sapiente
            delectus vel ipsam exercitationem laborum harum. Numquam accusantium
            esse voluptas architecto impedit repellendus illo nesciunt natus.
            Assumenda tempora quaerat nam. Officiis quam iste sunt, vero natus
            asperiores inventore consequuntur minus dolorem perspiciatis facere
            aspernatur sint dolor assumenda necessitatibus reiciendis ad
            nesciunt delectus amet deserunt! Quis assumenda eveniet fuga
            doloribus, corporis magnam modi culpa illo saepe cumque tempore quos
            aut? Tempora provident earum reiciendis minus mollitia quaerat quo
            nulla adipisci voluptatibus dignissimos! Natus, blanditiis ullam.
            Eligendi expedita, alias fugiat incidunt veritatis perspiciatis
            repudiandae consequuntur cumque et ea animi fugit eos ipsa harum
            reiciendis natus cum. Voluptatum veniam impedit, fuga cumque ratione
            hic vitae inventore, perspiciatis vero similique nobis veritatis
            blanditiis eveniet. Doloremque similique officia alias molestias
            architecto, incidunt aspernatur sunt itaque facilis ea quos ipsum
            non molestiae cum praesentium aliquid culpa. Necessitatibus nesciunt
            quis laudantium commodi provident placeat? Excepturi nisi quisquam
            voluptate, ea rem sequi id perspiciatis qui alias non, sed culpa,
            quae incidunt ipsa! Ex laboriosam at saepe atque nihil distinctio
            eaque! Ea ab blanditiis odio sequi. Hic esse ad reiciendis
            necessitatibus? Iusto animi dolor sed. Voluptatem possimus
            blanditiis recusandae molestiae assumenda. Voluptatum dolorum sunt
            ea ad odio reprehenderit dignissimos numquam eaque expedita incidunt
            eveniet, architecto accusantium non, laudantium hic ipsam ipsum
            pariatur atque. Repudiandae expedita esse assumenda ipsa non
            dolorem, dolore suscipit quibusdam delectus error voluptate corporis
            nobis adipisci, quaerat mollitia accusamus, optio consectetur. Quam
            pariatur tenetur impedit, non in facere ea reiciendis, corporis ex
            consectetur earum sequi debitis quo vel consequatur placeat, ratione
            quia mollitia molestias ducimus quisquam explicabo exercitationem
            quos. Ipsam unde sunt veritatis praesentium eos fuga repellat illum
            libero voluptatibus rem animi obcaecati aspernatur reprehenderit
            temporibus asperiores, pariatur eveniet eius, doloremque consequatur
            placeat autem repudiandae. Non omnis repellendus a est, veritatis
            cumque exercitationem cupiditate dolores illum in molestias quas cum
            expedita ut laudantium sapiente. Error, officia quaerat reiciendis
            ullam similique minus facilis? Nam amet reprehenderit cum quibusdam
            repellendus eum aliquam reiciendis vel unde dolor? Sed sequi ab
            officiis repellendus a suscipit nemo architecto, possimus debitis
            eos qui deserunt sint pariatur explicabo tempore reiciendis modi
            earum tempora velit. Ducimus ex incidunt sapiente a, repellat vel
            corporis nemo tempora at saepe illum quae corrupti cumque suscipit
            necessitatibus distinctio laborum odit autem debitis alias fugit
            itaque. Dolore hic, voluptatibus explicabo, dicta vitae deserunt
            magni laborum, accusantium excepturi consectetur optio impedit
            pariatur commodi praesentium iusto quo perferendis! Omnis voluptatem
            maiores nihil quam amet minus alias, cum consequuntur nobis
            laudantium? Aliquam, tempora neque quasi unde sapiente cum nobis
            repellendus laborum vitae dolore aperiam obcaecati rem laudantium.
            Porro consequuntur deserunt, fuga doloribus necessitatibus
            dignissimos autem, dicta cupiditate sequi rem distinctio excepturi
            illo nesciunt velit earum reprehenderit tempora exercitationem
            accusantium minus fugiat numquam animi! Officia beatae eaque
            officiis, eveniet odio rerum ipsam at delectus consectetur a
            inventore praesentium accusantium, tempora voluptas quas eos
            perspiciatis dicta. Doloribus, ut suscipit eum in nesciunt id dicta
            eos eveniet reiciendis neque non obcaecati? Veritatis, assumenda,
            consequuntur recusandae aliquid autem eveniet distinctio asperiores
            temporibus fuga laudantium voluptatum, quisquam obcaecati ratione
            sapiente sequi amet magnam omnis rerum velit ipsam? Reiciendis
            maxime molestias quasi numquam voluptatibus et voluptatem, hic eius
            quo dignissimos, sunt beatae voluptatum, similique totam? Unde minus
            tempora quidem. Sit placeat exercitationem molestias doloremque
            inventore ipsam tempore dolorum, obcaecati iusto alias quisquam sint
            animi unde, laborum necessitatibus temporibus ab! Cum, fuga
            recusandae cumque asperiores ut iusto magni atque dolor temporibus
            exercitationem similique voluptate pariatur adipisci iste aliquid
            iure repellendus soluta, saepe tempore sint blanditiis consequuntur
            illo commodi maxime! Neque fuga quidem atque repellat reiciendis aut
            unde odit. Eaque fuga recusandae eum sapiente quaerat nihil nam
            numquam ratione quisquam adipisci optio maiores esse error vitae,
            autem quos commodi tempora! Maiores sunt earum, laborum dicta iure
            iste nemo quae adipisci mollitia nihil? Totam illo unde inventore
            repudiandae! Reiciendis blanditiis aspernatur asperiores. Quibusdam
            error vitae repudiandae sint quaerat, quisquam voluptate praesentium
            minus quasi. Incidunt beatae, nemo dicta consectetur recusandae
            corporis hic eum! Officia, ex quidem in itaque quia ipsa vel magnam
            alias tenetur odit nesciunt autem suscipit cupiditate pariatur
            voluptatum omnis reiciendis exercitationem, nobis voluptas ad iste.
            Officiis delectus veniam facere sed eaque consequuntur nihil, animi
            amet exercitationem atque reiciendis nemo ipsam error cum, eveniet
            dolorem numquam, veritatis minus enim! Dolorum, ducimus odio
            deserunt ullam incidunt omnis, optio non accusamus facilis iure
            nisi, consequuntur eius ut animi assumenda? Minima totam consequatur
            aliquid velit consequuntur est esse optio ipsum iste asperiores,
            facere quibusdam vero laborum laudantium repudiandae fuga modi saepe
            officia nisi exercitationem! Veniam, ea amet ipsam, delectus, ipsa
            similique corporis veritatis fugit sint ipsum natus illum mollitia
            nesciunt voluptate animi magni perferendis beatae molestiae aliquid
            esse praesentium autem minima provident. Ea nisi illo recusandae
            harum saepe adipisci? Adipisci natus, nemo fugiat et temporibus
            deleniti perferendis suscipit unde saepe maxime hic maiores
            asperiores consequuntur inventore amet ad ratione magni. Molestiae
            maiores optio commodi, enim cumque labore vero quasi. Error iusto,
            animi numquam reiciendis ab aperiam. Asperiores earum repellendus
            maxime minus ipsa culpa cum dolorem. Adipisci ullam nobis amet
            magnam cupiditate facilis ea ab, quis dolore hic reiciendis, rerum
            asperiores illo ipsam commodi iusto debitis nesciunt sapiente veniam
            doloremque! Deleniti eligendi officiis praesentium ullam non
            voluptatum excepturi ab veritatis id quis, modi eaque nihil quod
            obcaecati quos sapiente voluptates adipisci iste est minima
            consequuntur inventore ipsum quia. Quisquam suscipit magnam harum
            vel natus in cupiditate enim officia, nulla ipsam, fuga excepturi!
            Amet repudiandae possimus deleniti culpa. Delectus fuga alias et qui
            in impedit recusandae fugiat, consequatur tenetur neque libero
            ratione nulla quos voluptatum nisi architecto commodi saepe mollitia
            eos cum quam labore officia sapiente dolorum. Quas, blanditiis! Quas
            adipisci, laudantium perspiciatis eligendi eum error iure
            consequatur. Eligendi, illo? Perferendis, eveniet modi odio vel sint
            enim ducimus id quas officia voluptatibus veniam illo tempora
            tenetur inventore. Quaerat quas dicta numquam reprehenderit
            provident quisquam quod aut ipsam tenetur ab, aperiam tempore. Ex ad
            nostrum quos optio? Quos aut qui laborum at culpa, tempore cumque ea
            commodi incidunt veniam voluptas architecto? Odio veritatis aut
            aspernatur! Assumenda, minus aut debitis voluptatibus rem esse
            laudantium sapiente adipisci! Aperiam, ut ratione. Hic ad fuga
            minima maiores nobis molestiae culpa nesciunt ipsam provident
            voluptates rem, optio quo consequuntur quasi quidem rerum sed unde
            error minus praesentium distinctio. Debitis, eaque iste blanditiis
            temporibus totam adipisci quaerat unde non eligendi dolores enim
            exercitationem. Quia amet neque iusto architecto sequi saepe animi
            accusantium, excepturi eos nulla perferendis. Obcaecati aliquid odio
            saepe nulla ex nihil explicabo! Explicabo sit debitis cupiditate
            iure culpa, repellat, sunt autem rerum corrupti labore repudiandae
            qui ratione expedita reiciendis iusto molestiae inventore adipisci,
            commodi ipsum harum repellendus distinctio voluptatum accusantium
            assumenda. Pariatur incidunt perferendis corporis inventore laborum,
            voluptatibus saepe sed quis exercitationem, optio necessitatibus
            illo excepturi, soluta recusandae a molestiae tempore ducimus
            voluptates reiciendis dolor magni amet. Cupiditate cumque nemo natus
            magni repellendus magnam ab hic aperiam aliquid illum molestiae
            maxime itaque nulla at voluptas odio, fuga dignissimos debitis
            facere eius sit recusandae! Ut, impedit exercitationem porro iste
            temporibus, minus dolore labore, voluptate dolorum accusantium amet
            repellendus! Voluptatum officia dolorum veniam ea facere, error quod
            fugiat eius deserunt veritatis quae voluptate excepturi ad
            aspernatur perferendis illo molestiae numquam nisi dicta et tempora
            ab dolor dignissimos placeat! Dolores quisquam vero distinctio
            officia suscipit non provident impedit culpa commodi, voluptatum
            laudantium nesciunt deserunt! Commodi reprehenderit expedita libero
            saepe aliquam modi inventore veritatis earum asperiores ipsa non,
            eius, consequuntur quis porro? Quos placeat voluptatibus suscipit
            nisi quasi accusantium provident laboriosam eos consectetur dolorem.
            Aliquid sint libero perferendis tempora? Voluptatum debitis in totam
            eveniet officiis, voluptatem doloribus dignissimos quidem eligendi
            unde impedit excepturi voluptas sint perferendis accusantium harum
            laborum aperiam voluptates nesciunt eos tenetur deleniti eius!
            Suscipit tempore delectus recusandae ab nihil excepturi, consequatur
            dolorem fuga assumenda quos. Amet quidem vitae ab quasi
            reprehenderit reiciendis id placeat quas odit aliquam nobis,
            aliquid, adipisci rem ipsum illo asperiores rerum est inventore
            officia impedit sapiente vel quo. Laboriosam nemo ipsam ad tempore
            repudiandae vero quod omnis maiores rerum adipisci sunt dignissimos
            qui, quis magnam dicta officia, ea suscipit alias sequi enim. Enim
            fugiat quod reiciendis praesentium pariatur, neque molestias cum
            ullam, quam voluptatibus aspernatur provident, perferendis
            blanditiis recusandae totam alias vero id laborum tenetur inventore.
            Necessitatibus voluptatem dolorum at vero sed. Numquam nostrum a
            aperiam architecto et ab sit doloremque assumenda fugiat corrupti
            quam itaque incidunt veniam vitae, dicta veritatis ea tenetur odio
            dolores rem esse quia maiores eaque voluptatibus? Distinctio
            perferendis quia quo inventore. Distinctio laboriosam minus officia,
            impedit accusantium possimus voluptas vero quisquam architecto,
            delectus quos nam placeat, asperiores adipisci magni. Dicta
            asperiores dolore libero distinctio explicabo assumenda.
            Exercitationem repellat fuga placeat. Iusto hic, aliquam maxime quas
            inventore unde nisi expedita necessitatibus possimus minima vel ex,
            quae impedit eaque quia ut perferendis at alias delectus neque illum
            voluptatem? Animi quo nesciunt tenetur nulla cum beatae? Alias
            veritatis quidem in, ex voluptatibus laboriosam rem corrupti
            eligendi maxime nulla ipsum dolor dicta magnam sunt voluptate eaque,
            vero consequuntur reprehenderit, vitae molestias! Nulla laboriosam
            ipsum voluptatibus doloribus, nobis maxime fugiat inventore
            reprehenderit quisquam impedit doloremque, nostrum obcaecati quod?
            Adipisci enim voluptatum recusandae, accusantium laboriosam dolor
            reiciendis odit placeat dolore, numquam praesentium, assumenda ad
            rem accusamus voluptate possimus veniam eum maxime! Quisquam quod
            sapiente necessitatibus odio beatae ad aspernatur pariatur quam
            ratione id nesciunt recusandae libero, saepe voluptates voluptate
            veniam omnis voluptatem molestias impedit consectetur asperiores.
            Vitae laboriosam quam itaque eum? Odio praesentium alias similique
            quos assumenda provident quisquam laborum neque consectetur.
            Exercitationem magnam placeat accusamus eligendi minus ratione
            molestias qui! Doloribus quibusdam qui impedit saepe quia facilis
            illum ipsum. Quos ex repellendus iusto mollitia doloremque ad aut
            optio obcaecati laboriosam adipisci. Harum labore quod ducimus,
            doloribus optio error nisi id modi! Sit itaque nam dolor libero
            cupiditate earum ipsa recusandae esse, molestias reprehenderit fuga,
            sequi animi voluptates quas beatae rerum sed quis autem, quibusdam
            amet quod. Itaque nostrum iure atque, repellendus laborum incidunt
            animi! Optio praesentium distinctio adipisci consequuntur veritatis
            ullam neque non quis. Earum consectetur nisi recusandae beatae alias
            eos explicabo libero a culpa ea totam iure, quasi molestiae,
            incidunt quod natus. Sapiente cumque voluptas dicta dignissimos,
            adipisci aspernatur ipsa ducimus quidem, odio molestiae nostrum qui
            consectetur fuga optio! Veniam ratione quaerat ex quis atque
            dolorem, aut, reprehenderit vitae iure sed quod harum quo ducimus at
            excepturi, nesciunt inventore facilis. Aliquam distinctio est libero
            alias. Pariatur et animi minima hic, porro ab totam necessitatibus
            error possimus architecto nobis placeat cumque? Impedit perferendis
            eligendi fugit quam. Non porro animi recusandae tenetur dolor vitae
            accusantium nam quis vero, quam deserunt pariatur, possimus, nostrum
            a ex. Hic excepturi facilis nulla iure, voluptate voluptates quam
            obcaecati accusamus consequuntur non? Sapiente, est voluptatum
            quidem quaerat animi explicabo quia? Dolores repudiandae placeat
            modi aliquid nesciunt minus necessitatibus consequatur! Doloribus
            libero perferendis accusamus quis placeat veritatis odio corrupti
            dignissimos, esse minima a, ipsam reiciendis. Ipsam saepe et quasi
            iure nulla mollitia quaerat dicta eum dolore perferendis repellendus
            doloribus magni obcaecati, optio nam hic laborum blanditiis autem
            consequuntur, possimus, maxime enim velit magnam? Maxime itaque
            praesentium doloremque eaque sit accusantium rem magnam, odit
            ducimus sunt fuga repudiandae aut illum laborum officiis aliquam
            nulla esse provident ab ea sequi? Magni ex quam, aperiam facere,
            iure, sunt illo non modi ab delectus ipsam a ea rem aspernatur
            nesciunt aliquam libero? Laudantium, quam itaque corrupti
            necessitatibus vel sunt aperiam sint ducimus atque officia non odio
            asperiores ullam labore excepturi suscipit doloremque explicabo!
            Officiis distinctio saepe quasi, ipsa ratione quae labore expedita
            animi nostrum optio illo tempore culpa alias iure excepturi harum?
            Porro placeat iure doloribus soluta quas provident. Animi nisi ipsa
            voluptatem corrupti aspernatur ullam vero neque quas quaerat, illum
            incidunt dolorum quae, praesentium aliquid iure accusamus mollitia
            expedita, quisquam tempora dignissimos corporis. Quos, debitis
            reprehenderit laborum ullam eum qui, amet, nemo dolorem voluptas rem
            sed unde sit consequuntur. Ad, nesciunt alias. Voluptates in eum
            tempora! Sunt labore fuga accusamus, eum, eius aspernatur incidunt
            ut explicabo, consequuntur vel at repellat autem. Fugit asperiores
            labore provident quidem magni iste repellat consequuntur debitis
            corporis consectetur magnam iure, quaerat libero itaque atque
            voluptates deserunt eligendi quis sapiente cumque. Molestiae culpa
            assumenda corrupti ullam quod qui mollitia maiores. Dicta ullam
            molestias fugit excepturi aliquid nihil laborum minima. Fugiat
            nesciunt est aliquid illum nulla aliquam. Aliquam amet earum
            similique possimus sit debitis nobis vel inventore dicta architecto
            illo laboriosam doloribus, temporibus laudantium, laborum aut
            perspiciatis! Explicabo ex temporibus cum, minima est aut ea laborum
            deleniti doloremque expedita esse adipisci ducimus quasi, ullam
            optio non perferendis nisi voluptatem pariatur repudiandae.
            Voluptatibus temporibus dignissimos ut quos, quae quasi error
            facilis sit officia nulla ducimus, repudiandae, dolores vero ratione
            quod facere perferendis. Consequuntur, magnam ratione quis a minima
            saepe doloremque quae unde expedita distinctio excepturi
            exercitationem ipsam possimus pariatur provident magni sunt ab
            voluptas laudantium. Perspiciatis, delectus sed, in, aliquid unde
            quia laborum animi nemo praesentium eaque ex distinctio! Laboriosam
            quam velit qui ad soluta nulla vero, quibusdam quidem neque ullam
            voluptas sequi deleniti dolorum molestiae corporis tempore ex,
            aliquid in quos tempora, dolorem eligendi obcaecati repudiandae cum.
            Nemo distinctio exercitationem non pariatur, esse quo! Eos voluptate
            nesciunt voluptas excepturi amet, esse odio iste vitae tenetur odit
            illum molestiae perferendis necessitatibus, accusantium accusamus!
            Delectus, reiciendis eligendi vel a ipsa deleniti nobis modi tenetur
            praesentium temporibus omnis consectetur quo ducimus voluptates sunt
            voluptas et! In, quo perspiciatis ad aperiam nostrum quibusdam
            quidem labore aliquam cum quae. Repellendus consectetur esse eaque
            veritatis facere recusandae tempora quas, fuga totam eligendi
            nesciunt, delectus quos at libero exercitationem animi dicta? Odit,
            distinctio nobis placeat rerum consequuntur laudantium, amet
            voluptas eum maiores quibusdam impedit dolorem veniam nulla harum
            facilis cumque ut dicta at. Illo eveniet assumenda asperiores
            aspernatur nemo suscipit ipsum, omnis inventore neque totam autem
            itaque amet! Voluptatem laborum quos consequatur, porro possimus
            doloremque nisi iure quisquam veritatis, at nostrum impedit
            inventore, alias reprehenderit. Ullam commodi, quos facilis
            distinctio cupiditate, quam quaerat praesentium perferendis id
            soluta, laborum iure eaque corrupti quas labore molestias. Numquam
            ab reprehenderit saepe. Itaque error temporibus quas distinctio
            magni quae laborum facere repellendus reiciendis, sed numquam ipsa
            cumque! Minus optio labore possimus incidunt! Unde eius placeat,
            inventore quia animi blanditiis sint ducimus voluptatibus quaerat?
            Laboriosam, est minima tempora in molestiae architecto nam iste aut
            dolor quas! Voluptatibus voluptatem veniam deleniti a commodi enim
            totam cum, similique vero praesentium eum est aliquid quod molestiae
            voluptas ratione ducimus velit magnam. Modi culpa, molestiae maxime
            tempore odit nulla similique! Natus facilis voluptatibus harum
            sapiente deserunt vero saepe? Ipsum soluta repudiandae nobis
            doloribus aut sunt beatae optio maiores eaque consequuntur. Dolor
            ipsam eaque, doloremque dicta ipsum sit deleniti alias hic magnam,
            recusandae repudiandae non sunt ullam asperiores ad quod reiciendis
            culpa. Deleniti alias eum harum hic dicta necessitatibus voluptate
            aliquid odit ex ut accusantium eaque fugiat laborum, doloribus rem?
            Quam eaque minima unde, labore accusantium accusamus ut provident
            nemo quis ea odit excepturi veritatis expedita magnam ipsam facere
            aspernatur in, dicta odio. Earum odio mollitia voluptates eius alias
            repellat quae nemo, perspiciatis dolorum vero dolor! Dolore possimus
            veniam odit inventore neque! Fuga corporis eaque officiis neque ab
            cum nobis dicta dolorem. Saepe, mollitia, commodi fugit quae eius
            aut nesciunt magni cumque vero explicabo ullam natus voluptatem.
            Voluptate, doloribus exercitationem modi eius minus pariatur optio
            odio itaque excepturi asperiores dolores inventore nemo quasi
            possimus, voluptatum rerum soluta laudantium? Minima, deserunt amet
            temporibus culpa cum quaerat nesciunt! Accusantium illo harum
            accusamus obcaecati eius eaque cumque odit voluptas libero nisi ad
            dicta deserunt, ullam sequi, hic dolorem eligendi eos vel.
            Asperiores, perspiciatis nesciunt! Accusantium illum labore ea
            officiis magni alias ducimus esse consequatur consectetur! Excepturi
            nostrum minus beatae ipsam, error animi, autem nam iste sed
            assumenda nobis ut nisi enim praesentium, recusandae aperiam? Sunt
            unde deleniti ipsam fugiat corporis nesciunt enim temporibus
            sapiente iure. Et nostrum ratione praesentium ut quam magni ipsum
            excepturi quod quia ducimus, libero esse consequuntur deleniti
            pariatur sapiente voluptates omnis repudiandae nobis cumque minima
            voluptatem error adipisci. Dolorem mollitia exercitationem doloribus
            quam quasi obcaecati reprehenderit impedit, veritatis praesentium.
            Fugiat expedita, repellendus perspiciatis, accusamus dolorum vero
            laudantium hic possimus itaque saepe error neque excepturi qui
            officiis, sit pariatur perferendis labore. Id libero at molestiae
            itaque omnis quisquam inventore incidunt beatae. Nihil veritatis,
            earum beatae nesciunt in consequatur nam, tempora repellendus ut
            perferendis, iusto perspiciatis veniam soluta facere dolore dolorum
            magni. Molestiae cum facere blanditiis dicta excepturi possimus,
            voluptatum obcaecati dolor saepe, tempora ad. Error asperiores culpa
            voluptatum. Recusandae eaque itaque tempora repellendus cum tempore
            dolorem, facilis atque repudiandae!
          </p>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Dashboard;
