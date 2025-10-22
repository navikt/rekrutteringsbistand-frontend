import{am as I,an as w,j as t,p as k,S as j,ci as x,ck as b,cm as g,cz as u,aK as y,cA as _}from"./iframe-BpAMzbpD.js";import{w as m,c as D}from"./ContextDecorators-BHVUFTfc.js";import{F as N,A as v}from"./FullførtStilling-Dg0LtYp4.js";import{R as T}from"./GjenåpneStillingKnapp-D0-b4IM9.js";import{T as A}from"./TilgangskontrollForInnhold-C8pTIdaJ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CFLN5hQ2.js";import"./OrganisasjonsnummerAlert-DmySheGN.js";import"./VStack-XMCWsZIr.js";import"./BasePrimitive-BP5Ply4H.js";import"./List-CWTwwk6H.js";import"./Link-BASyYMr1.js";import"./KandidatHendelseTag-qTouAMS0.js";import"./Tag-C2U7Qelp.js";import"./FileXMark-Cp8cIU3v.js";import"./Trash-Zelg3jv0.js";import"./HandShakeHeart-Zv71_2yY.js";import"./Calendar-ChH2CqdW.js";import"./ThumbUp-D7UitzWa.js";import"./Table-DydzMjHR.js";import"./util-BAhXs1Zv.js";import"./format-CERjb80Z.js";import"./match-wsBYmfrA.js";import"./parse-DrdAJy4P.js";import"./getDefaultOptions-YPBy5iMj.js";import"./parseISO-DP54w3ag.js";import"./util-CXMN-qRW.js";import"./accordion-BjaJ6GEa.js";import"./index-B2azV3Hx.js";import"./index-Bz_of2tP.js";import"./index-Cj4pNOU9.js";import"./ChevronDown-TAdbvDWv.js";import"./Box-AcxEZv3v.js";import"./Bell-DweW1CSm.js";import"./PersonChat-EqO5bm4B.js";import"./Eye-Dg03YAJe.js";import"./ProgressBar-_6EhCmWc.js";import"./EyeSlash-DaQ_4cL5.js";import"./CircleSlash-Dcl-XTMS.js";import"./Modal-D5fekCo_.js";import"./floating-ui.react-BVqJumW4.js";import"./Date.Input--12ODzPC.js";import"./useFormField-CN_2X3Ux.js";import"./useControllableState-KMcY1F_r.js";import"./Modal.context-B5dNLjIw.js";import"./Checkbox-BMmFHU5G.js";import"./Fieldset-BhEBZukG.js";import"./Pencil-Bu86V0xg.js";import"./PersonbrukerTekst-DzZBsqXu.js";import"./ClockDashed-C190MToK.js";import"./Tasklist-BtggF3zF.js";import"./ErrorBoundary-BPFfTsbI.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
