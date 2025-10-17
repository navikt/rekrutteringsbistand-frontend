import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-BTWmweLi.js";import{w as d,c as D}from"./ContextDecorators-L6Jwyqpb.js";import{F as N,A as v}from"./FullførtStilling-R51RA770.js";import{R as T}from"./GjenåpneStillingKnapp-CQafvF7k.js";import{T as A}from"./TilgangskontrollForInnhold-DXvP3X4Z.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bd8csJTp.js";import"./OrganisasjonsnummerAlert-BRU4p2Aa.js";import"./VStack-Bvk6nylg.js";import"./BasePrimitive-BvL64Zdv.js";import"./List-D7f8uJR3.js";import"./Link-CZeDRCSY.js";import"./KandidatHendelseTag-rS1Jue0z.js";import"./Tag-B90XF49d.js";import"./ChatExclamationmark-DtbN4rYy.js";import"./FileXMark-D2QprsHp.js";import"./Trash-CQNSmAUp.js";import"./HandShakeHeart-ocrmw2HP.js";import"./Calendar-dxDUhpS2.js";import"./ThumbUp-yPJns9Zx.js";import"./Table-OeNpFAOB.js";import"./util-CgYIlP8i.js";import"./format-nXkQDeqK.js";import"./match-Ceft5OFa.js";import"./parseISO-cWGmtevm.js";import"./parse-CIeY0Gnj.js";import"./getDefaultOptions-BP7_tTwA.js";import"./util-B-SYN4OI.js";import"./accordion-CCrxFGoW.js";import"./index-PESWNsS4.js";import"./index-BI7cDod1.js";import"./index-C4UrncMp.js";import"./ChevronDown-BurMjht3.js";import"./Box-CqPQhVlE.js";import"./Bell-DtYxNWfX.js";import"./PersonChat-CFKxDmFJ.js";import"./Eye-CKg78AiK.js";import"./ProgressBar-MFeCwBNp.js";import"./EyeSlash-CPH9zKwt.js";import"./CircleSlash-CI2msOg9.js";import"./Modal-DiRUPVHz.js";import"./floating-ui.react-DvBUZrXh.js";import"./Date.Input-BDf-ZmtR.js";import"./useFormField-DIeB7L7F.js";import"./useControllableState-CAO2XIOD.js";import"./Modal.context-CyWp2Ee1.js";import"./Checkbox-B049hhUA.js";import"./Fieldset-BGOQ4TyI.js";import"./Pencil-CMHMBpmS.js";import"./PersonbrukerTekst-zT1nSnSl.js";import"./ClockDashed-Dsx1TIRX.js";import"./Tasklist-C1mw3toI.js";import"./ErrorBoundary-DkHHy5aO.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
