import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-BFw6Y54_.js";import{w as m,c as D}from"./ContextDecorators-DhmDnBTB.js";import{F as N,A as v}from"./FullførtStilling-DW8SauDP.js";import{R as T}from"./GjenåpneStillingKnapp-D1yWE_7r.js";import{T as A}from"./TilgangskontrollForInnhold-DJPTMNPn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bp-TzhYA.js";import"./OrganisasjonsnummerAlert-mmxG7-15.js";import"./VStack-B9u6Resu.js";import"./BasePrimitive-iQxW9vIq.js";import"./List-DVrQCTc0.js";import"./Link-Zp9U8sJf.js";import"./KandidatHendelseTag-B5at6uhU.js";import"./Tag-BeUliE51.js";import"./ChatExclamationmark-NslFaVM3.js";import"./FileXMark-DBtoqCfu.js";import"./Trash-B33bdc92.js";import"./HandShakeHeart-DgYqNuSd.js";import"./Calendar-BcACRogC.js";import"./ThumbUp-9isVQgxg.js";import"./Table-DHSEGGah.js";import"./util-BBbqSAOi.js";import"./format-yhhj1YHs.js";import"./match-BbxCpORa.js";import"./parse-TUzDeo8x.js";import"./getDefaultOptions-BvQZfsqJ.js";import"./parseISO-CQGNEfmV.js";import"./index-CGMsUO1L.js";import"./index-B40KJ5b4.js";import"./isBefore-BiTNg5qO.js";import"./util-B_whZKfY.js";import"./accordion-80KICM5r.js";import"./index-DHAaXOSA.js";import"./index-BspB4ohp.js";import"./index-DPkzREjg.js";import"./ChevronDown-B-ng3SfS.js";import"./Box-DgRxyqJv.js";import"./Bell-B8TURmXV.js";import"./PersonChat-CdX6Er32.js";import"./Eye-CRnG2gno.js";import"./ProgressBar-BysaK9d_.js";import"./EyeSlash-YNS5DMh4.js";import"./CircleSlash-CbZ5eulS.js";import"./Modal-CR-KPvZK.js";import"./floating-ui.react-CzAqc4TG.js";import"./Date.Input-BMAxxrnk.js";import"./useFormField-DPmE2r1w.js";import"./useControllableState-CMcPgaqx.js";import"./Modal.context-CM0EOp7U.js";import"./Checkbox-DTjaUq9V.js";import"./Fieldset-D0vE5uhx.js";import"./Pencil-63gevZKU.js";import"./PersonbrukerTekst-BaU20I6O.js";import"./ClockDashed-BbCJjA_B.js";import"./Tasklist-BIn_gFgf.js";import"./ErrorBoundary-DODJJiUY.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
