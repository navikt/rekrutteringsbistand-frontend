import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-D9mqkd8J.js";import{w as d,c as D}from"./ContextDecorators-C2DDybda.js";import{F as N,A as v}from"./FullførtStilling-DJB_2XPg.js";import{R as T}from"./GjenåpneStillingKnapp-BrzZcEqV.js";import{T as A}from"./TilgangskontrollForInnhold-BTTD1liz.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DlwI21Yt.js";import"./OrganisasjonsnummerAlert-CS-NcEr6.js";import"./VStack-CDhuPf9Y.js";import"./BasePrimitive-B3ciBDpN.js";import"./List-B-uwTmvA.js";import"./Link-M_AJD5Ob.js";import"./KandidatHendelseTag-BzFOeSdN.js";import"./Tag-BvNBSGKY.js";import"./ChatExclamationmark-L2UpYfHW.js";import"./FileXMark-4rwoeoHF.js";import"./Trash-CzVUQuc8.js";import"./HandShakeHeart-CUYrnLNx.js";import"./Calendar-B0NiFczk.js";import"./ThumbUp-Ctn7Umq2.js";import"./Table-Bks60uh_.js";import"./util-DSVI0ePf.js";import"./format-CzEV6SwL.js";import"./match-FBklN04L.js";import"./parseISO-DOIvH0AY.js";import"./parse-COQhzVgn.js";import"./getDefaultOptions-CWXBYWBL.js";import"./util-PvlszHua.js";import"./accordion-D2yUR6qX.js";import"./index-CNmuQjJw.js";import"./index-DjtdKH5F.js";import"./index-DAfJ_I0z.js";import"./ChevronDown-Bbco9iiR.js";import"./Box-DrO21o_-.js";import"./Bell-D1Y2BJ_Q.js";import"./PersonChat-6zBOgYEh.js";import"./Eye-BV3iChka.js";import"./ProgressBar-BwYp29oa.js";import"./EyeSlash-7XHdMoT5.js";import"./CircleSlash-CZBBLMyd.js";import"./Modal-BheaPe08.js";import"./floating-ui.react-DcHBzFuk.js";import"./Date.Input-6hDRRA25.js";import"./useFormField-HR3NeTCc.js";import"./useControllableState-GZ88C6KH.js";import"./Modal.context-BivSpKRk.js";import"./Checkbox-CicrznTC.js";import"./Fieldset-BXdG_u7v.js";import"./Pencil-DRZt_T3H.js";import"./PersonbrukerTekst-DBzdkbxH.js";import"./ClockDashed-Cx5URZwQ.js";import"./Tasklist-Bdj0ABqw.js";import"./ErrorBoundary-BkzNRI92.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
